from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
from pymongo import MongoClient, errors
import time
import math

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
socketio = SocketIO(app, cors_allowed_origins="*")
uri = "mongodb://localhost:27017"

# MongoDB Connection
try:
    client = MongoClient(uri)
    client.admin.command('ismaster')
    print("Connected to the database successfully.")
except errors.ConnectionFailure:
    print("Failed to connect to the database.")

db = client['RealTimeDataAnalysis']
users_collection = db['profiles_ind']
recruiter_check_collection = db['checklist']
recruiter_collection = db['recruiters']

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    firstname = data.get('first_name')
    lastname = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    role = data.get('role')  # Fetch the role from the request

    # Check if the email already exists in users or recruiters collection
    if users_collection.find_one({'email': email}) or recruiter_collection.find_one({'email': email}):
        return jsonify({'error': 'User or recruiter already exists'}), 409

    # Role-based logic: If recruiter, add to recruiter collection; if user, add to users collection
    if role == 'recruiter':
        company_name = data.get('company_name')
        recruiter_id = data.get('id')

        # Ensure required fields for recruiter
        if not company_name or not recruiter_id:
            return jsonify({'error': 'Company name and ID are required for recruiters'}), 400

        recruiter_data = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password': password,
            'role': role,
            'company_name': company_name,
            'recruiter_id': recruiter_id,
        }

        # Insert recruiter into the recruiters collection
        recruiter_collection.insert_one(recruiter_data)

    elif role == 'user':
        # Logic for signing up a normal user
        user_data = {
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password': password,
            'role': role
        }

        # Insert user into the users collection
        users_collection.insert_one(user_data)

    return jsonify({'message': 'User or recruiter created successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('mail')
    password = data.get('password')
    role = data.get('role')  # Retrieve the role from the request

    # Check if email, password, and role are provided
    if not email or not password or not role:
        return jsonify({'error': 'email, password, and role are required'}), 400

    # Handle login based on role (user or recruiter)
    if role == "admin":
        return jsonify({'message': 'Login successful', 'user': {'role': "admin"}}), 200

    # Find the user or recruiter by email
    if role == "user":
        user = users_collection.find_one({'email': email})
    elif role == "recruiter":
        user = recruiter_collection.find_one({'email': email})

    # Check if the user or recruiter exists and if the password matches
    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    return jsonify({
        'message': 'Login successful',
        'user': {
            'firstname': user['firstname'],
            'lastname': user['lastname'],
            'email': user['email'],
            'role': role
        }
    }), 200


def convert_objectid(user):
    if user and '_id' in user:
        user['_id'] = str(user['_id'])
    return user


@app.route('/profile', methods=['GET'])
def get_profile():
    email = request.args.get('email')  # Get email from query parameter
    user = users_collection.find_one({'email': email}) or recruiter_collection.find_one({'email': email})
    user = convert_objectid(user)
    
    if user:
        return jsonify({'data': user})
    else:
        return jsonify({'error': 'User or recruiter not found'})


@app.route('/editprofile', methods=['POST'])
def edit_profile():
    data = request.get_json()
    email = data.get('email')
    update_data = data.get('data')

    update_data = {k: v for k, v in update_data.items() if v is not None}
    user_data = users_collection.find_one({'email': email}) or recruiter_collection.find_one({'email': email})

    if user_data:
        for field, value in update_data.items():
            if field == "photo":
                # Ensure photo is a Base64 string
                user_data['photo'] = value
            elif field == "education":
                for edu in value:
                    if edu['graduatedyear'] != '':
                        if edu not in user_data.get('education', []):
                            user_data.setdefault('education', []).append(edu)
            elif field == "companies":
                for company in value:
                    if company['name'] != '':
                        if company not in user_data.get('companies', []):
                            user_data.setdefault('companies', []).append(company)
            elif field == "skills":
                if value != '':
                    for skill in value:
                        if skill.lower() not in map(str.lower, user_data.get('skills', [])):
                            user_data.setdefault('skills', []).append(skill)
            else:
                user_data[field] = value

        try:
            result = users_collection.update_one({'email': email}, {'$set': user_data})
            if result.modified_count == 0:
                return jsonify({'error': 'No profile found to update'}), 404
            return jsonify({'message': 'Profile updated successfully'}), 200
        except Exception as e:
            return jsonify({'error': f'An error occurred while updating the profile: {str(e)}'}), 500
    else:
        return jsonify({'error': 'User or recruiter not found'}), 404


# Haversine formula to calculate distance between two locations
def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371.0  # Radius of Earth in kilometers
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c
    return distance


def calculate_priority(user1, user2):
    if 'education' in user1 and 'education' in user2:
        if len(user1['education']) > 0 and len(user2['education']) > 0:
            if user1['education'][0]['institution'] == user2['education'][0]['institution']:
                return 1  # Same current school

    if 'companies' in user1 and 'companies' in user2:
        if len(user1['companies']) > 0 and len(user2['companies']) > 0:
            if user1['companies'][0]['name'] == user2['companies'][0]['name']:
                return 2  # Same current company

    return 5  # No match


@app.route('/usersrec', methods=['POST'])
def recommend_users():
    data = request.json
    email = data['params']['email']
    users = list(users_collection.find()) + list(recruiter_collection.find())
    main_user = users_collection.find_one({'email': email}) or recruiter_collection.find_one({'email': email})

    distances = []
    priorities = []

    for user in users:
        if user['_id'] != main_user['_id']:
            distances.append(haversine_distance(float(main_user['location']['lat']),
                                                float(main_user['location']['lon']),
                                                float(user['location']['lat']),
                                                float(user['location']['lon'])))
            priorities.append(calculate_priority(main_user, user))

    return jsonify({'distances': distances, 'priorities': priorities})


if __name__ == '__main__':
    app.run(debug=True)
