import PropTypes from "prop-types";
import "./Component1.css";

const Component1 = ({ className = "" }) => {
  return (
    <div className={`component-2 ${className}`}>
      <img className="property-1frame-11" alt="" src="/component-2.svg" />
      <img className="property-1frame-21" alt="" src="/component-2.svg" />
    </div>
  );
};

Component1.propTypes = {
  className: PropTypes.string,
};

export default Component1;
