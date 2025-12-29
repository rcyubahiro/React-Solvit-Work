import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className = '', padding = 'md' }) => {
  const paddings = {
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div className={`
      bg-white
      rounded-xl 
      shadow-sm 
      border border-gray-200
      transition-colors duration-300
      ${paddings[padding]} 
      ${className}
    `}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Card;