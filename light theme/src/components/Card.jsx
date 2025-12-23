import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '',
  padding = 'default',
  hover = false,
  shadow = 'default'
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    default: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };
  
  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200
        ${shadows[shadow]}
        ${paddings[padding]}
        ${hover ? 'hover:shadow-md transition-shadow duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg']),
  hover: PropTypes.bool,
  shadow: PropTypes.oneOf(['none', 'sm', 'default', 'md', 'lg']),
};

export default Card;