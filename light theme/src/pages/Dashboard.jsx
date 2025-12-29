import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';
import { useProducts } from '../context/ProductContext';
import { useAssignments } from '../context/AssignmentContext';
import { useActivities } from '../context/ActivityContext';
import { 
  Users, 
  Package, 
  CheckCircle, 
  AlertTriangle,
  Box,
  ClipboardList,
  User
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { users } = useUsers();
  const { products } = useProducts();
  const { assignments } = useAssignments();
  const { activities } = useActivities();

  const assignedCount = assignments.filter(a => a.status === 'active').length;
  const unassignedCount = products.length - assignedCount;

  const formatRelativeTime = (isoString) => {
    if (!isoString) return '—';
    // If already a human string
    if (typeof isoString === 'string' && /ago|just now/i.test(isoString)) return isoString;
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '—';
    const diffMs = Date.now() - date.getTime();
    if (diffMs < 0) return '—';
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      value: users.length.toString(),
      label: 'Total Users',
    },
    {
      icon: <Package className="w-6 h-6" />,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      value: products.length.toString(),
      label: 'Total Products',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      value: assignedCount.toString(),
      label: 'Assigned Products',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      value: unassignedCount.toString(),
      label: 'Unassigned Products',
    },
  ];

  const recentProducts = products.slice(0, 5).map(product => ({
    ...product,
    statusColor: product.status === 'In Stock' 
      ? 'bg-green-100 text-green-700' 
      : product.status === 'Low Stock' 
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-red-100 text-red-700'
  }));

  const getActivityIcon = (type) => {
    switch (type) {
      case 'product_added':
      case 'product_updated':
      case 'product_deleted':
        return { icon: <Package className="w-5 h-5" />, bg: 'bg-blue-100', color: 'text-blue-600' };
      case 'category_added':
      case 'category_updated':
      case 'category_deleted':
        return { icon: <ClipboardList className="w-5 h-5" />, bg: 'bg-purple-100', color: 'text-purple-600' };
      case 'assignment_created':
      case 'assignment_updated':
      case 'assignment_deleted':
        return { icon: <ClipboardList className="w-5 h-5" />, bg: 'bg-green-100', color: 'text-green-600' };
      case 'user_added':
      case 'user_updated':
      case 'user_deleted':
        return { icon: <User className="w-5 h-5" />, bg: 'bg-indigo-100', color: 'text-indigo-600' };
      default:
        return { icon: <Package className="w-5 h-5" />, bg: 'bg-gray-100', color: 'text-gray-600' };
    }
  };

  const formattedActivities = activities.slice(0, 5).map(activity => {
    const iconData = getActivityIcon(activity.type);
    return {
      ...activity,
      icon: iconData.icon,
      iconBg: iconData.bg,
      iconColor: iconData.color,
      time: formatRelativeTime(activity.timestamp)
    };
  });

  const quickActions = [
    { name: 'View Users', desc: 'View all registered users', icon: <Users className="w-5 h-5" />, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', path: '/users', bgGradient: 'from-blue-50 to-blue-100/50' },
    { name: 'View Products', desc: 'View all registered products', icon: <Package className="w-5 h-5" />, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', path: '/products', bgGradient: 'from-purple-50 to-purple-100/50' },
    { name: 'View Assignments', desc: 'View all product assignments', icon: <ClipboardList className="w-5 h-5" />, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', path: '/assignments', bgGradient: 'from-indigo-50 to-indigo-100/50' },
  ];

  const getRoleBadgeColor = (role) => {
    switch ((role || '').toLowerCase()) {
      case 'admin':
      case 'manager':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  const getStatusBadgeColor = (status) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-linear-to-r from-primary-600 via-primary-500 to-blue-500 rounded-2xl shadow-lg p-6 md:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shrink-0">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">iHUZA INVENTORY - System Overview</h2>
            <p className="text-blue-100 mb-4 max-w-xl">
              Monitor your iHUZA inventory and product assignments in real-time.
            </p>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.iconBgColor} rounded-xl flex items-center justify-center shrink-0`}>
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Products */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Added Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {product.createdAt ? new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${product.statusColor}`}>
                  {product.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Users Summary (Admin only) */}
      {user?.role === 'admin' && (
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Users</h3>
              <Link to="/users">
                <Button variant="primary" size="sm">Add User</Button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Logout</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(users || []).slice(0, 6).map((u) => (
                    <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{u.name}</p>
                            <p className="text-sm text-gray-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getRoleBadgeColor(u.role)}`}>
                          {u.role || 'Staff'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadgeColor(u.status || 'Active')}`}>
                          {u.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{formatRelativeTime(u.lastLogout)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Link to="/users" className="text-blue-600 hover:text-blue-700 font-medium text-sm">Edit</Link>
                          <Link to="/users" className="text-red-600 hover:text-red-700 font-medium text-sm">Delete</Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <a href="#" className="text-sm text-gray-500 hover:text-primary-600">View all</a>
            </div>
            <div className="space-y-4">
              {formattedActivities.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No activities yet</p>
              ) : (
                formattedActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className={`w-10 h-10 ${activity.iconBg} rounded-full flex items-center justify-center shrink-0`}>
                      <div className={activity.iconColor}>{activity.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500 truncate">{activity.desc}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <div key={index} className={`bg-linear-to-r ${action.bgGradient} border border-gray-100 rounded-xl p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${action.iconBg} rounded-lg flex items-center justify-center`}>
                        <div className={action.iconColor}>{action.icon}</div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{action.name}</p>
                        <p className="text-xs text-gray-500">{action.desc}</p>
                      </div>
                    </div>
                    <Link to={action.path}>
                      <Button variant="primary" size="sm">Go</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
