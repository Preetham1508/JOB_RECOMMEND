import PropTypes from "prop-types";
import "./Features.css";

const Features = ({ className = "" }) => {
  return (
    <div className={`features1 ${className}`}>
      <div className="property-1default">
        <div className="property-1default-child" />
        <div className="property-1default-item" />
        <div className="property-1default-inner" />
        <div className="property-1default-child1" />
        <div className="property-1default-child2" />
        <div className="practice-questions1">
          <p className="practice1">{`  Practice `}</p>
          <p className="questions1">Questions</p>
        </div>
        <div className="mock-interviews1"> Mock Interviews</div>
        <div className="expert-feedback1"> Expert Feedback</div>
        <div className="performance-analytics1">
          <p className="performance1">Performance</p>
          <p className="analytics1"> Analytics</p>
        </div>
        <img
          className="screenshot-2024-06-14-154026-11"
          alt=""
          src="/screenshot-20240614-154026-1@2x.png"
        />
        <img className="feedback-1-icon1" alt="" src="/feedback-1@2x.png" />
        <img
          className="performance-1-icon1"
          alt=""
          src="/performance-1@2x.png"
        />
        <img className="mock-1-icon1" alt="" src="/mock-1@2x.png" />
      </div>
      <div className="property-1feature-1">
        <div className="property-1feature-1-child" />
        <div className="property-1feature-1-item" />
        <div className="property-1feature-1-inner" />
        <div className="property-1feature-1-child1" />
        <div className="property-1feature-1-child2" />
        <div className="practice-questions2">Practice Questions</div>
        <div className="practice-questions-a">
          Practice questions, a key feature of our website, help you simulate
          interviews, identify areas for improvement, and reinforce learning,
          ensuring better performance during actual interviews.
        </div>
      </div>
      <div className="property-1feature-2">
        <div className="property-1feature-2-child" />
        <div className="property-1feature-2-item" />
        <div className="property-1feature-2-inner" />
        <div className="property-1feature-2-child1" />
        <div className="property-1feature-2-child2" />
        <div className="expert-feedback2">Expert Feedback</div>
        <div className="expert-feedback-offers">
          Expert feedback offers personalized insights from industry
          professionals, helping you identify strengths and areas for
          improvement to enhance your performance in real-time interviews.
        </div>
      </div>
      <div className="property-1feature-3">
        <div className="property-1feature-3-child" />
        <div className="property-1feature-3-item" />
        <div className="property-1feature-3-inner" />
        <div className="property-1feature-3-child1" />
        <div className="property-1feature-3-child2" />
        <div className="mock-interviews2">Mock Interviews</div>
        <div className="mock-interviews-provide">
          Mock interviews provide a realistic simulation of real-time
          interviews, allowing you to practice answering questions, receive
          feedback, and build confidence to improve your performance.
        </div>
      </div>
      <div className="property-1feature-4">
        <div className="property-1feature-4-child" />
        <div className="property-1feature-4-item" />
        <div className="property-1feature-4-inner" />
        <div className="property-1feature-4-child1" />
        <div className="property-1feature-4-child2" />
        <div className="performance-analytics2">Performance Analytics</div>
        <div className="performance-analytics-involves">
          Performance analytics involves analyzing your performance data to gain
          insights into your strengths, weaknesses, and progress, helping you
          optimize your preparation for interviews.
        </div>
      </div>
    </div>
  );
};

Features.propTypes = {
  className: PropTypes.string,
};

export default Features;
