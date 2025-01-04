import PropTypes from "prop-types";
import "./Component.css";

const Component = ({ className = "" }) => {
  return (
    <div className={`component-1 ${className}`}>
      <img className="property-1frame-1" alt="" src="/property-1frame-1.svg" />
      <img className="property-1frame-2" alt="" src="/property-1frame-1.svg" />
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export default Component;
