import React from 'react';
import PropTypes from 'prop-types';

const DashboardCard = ({ icon, iconBgColor, iconColor, value, label }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 ${iconBgColor} rounded-xl flex items-center justify-center shrink-0`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          <p className="text-sm text-gray-600 truncate">{label}</p>
        </div>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  icon: PropTypes.node.isRequired,
  iconBgColor: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DashboardCard;