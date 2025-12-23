import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

const DashboardCard = ({ 
  icon, 
  iconBgColor = 'bg-primary-100',
  iconColor = 'text-primary-600',
  value, 
  label,
  trend,
  className = ''
}) => {
  return (
    <Card className={`${className}`} hover>
      <div className="flex items-center gap-4">
        <div className={`${iconBgColor} ${iconColor} p-3 rounded-lg shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
            {value}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {label}
          </div>
          {trend && (
            <div className={`text-xs mt-1 ${trend. positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.value}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

DashboardCard.propTypes = {
  icon: PropTypes.node. isRequired,
  iconBgColor: PropTypes.string,
  iconColor: PropTypes.string,
  value: PropTypes. oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  trend: PropTypes.shape({
    value: PropTypes.string,
    positive: PropTypes. bool,
  }),
  className: PropTypes.string,
};

export default DashboardCard;