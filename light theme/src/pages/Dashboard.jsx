import React from 'react';
import DashboardCard from '../components/DashboardCard';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  Users, 
  Package, 
  CheckCircle, 
  AlertTriangle,
  Box,
  AlignJustify
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-primary-600',
      value: '116',
      label: 'Total Users',
    },
    {
      icon:    <Package className="w-6 h-6" />,
      iconBgColor: 'bg-blue-100',
      iconColor:    'text-primary-600',
      value: '100',
      label: 'Total Products',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      iconBgColor: 'bg-green-100',
      iconColor:   'text-green-600',
      value: '10',
      label: 'Assigned Products',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      iconBgColor: 'bg-yellow-100',
      iconColor:    'text-yellow-600',
      value: '90',
      label: 'Unassigned Products',
    },
  ];

  const recentProducts = [
    { name: 'MacBook Pro 16"', category: 'Laptops', date: 'Dec 10, 2024', status:   'In Stock', statusColor:   'bg-green-100 text-green-700' },
    { name: 'Dell XPS 13', category: 'Laptops', date: 'Dec 9, 2024', status: 'In Stock', statusColor: 'bg-green-100 text-green-700' },
    { name: 'iPhone 15 Pro', category: 'Mobile', date: 'Dec 8, 2024', status: 'Low Stock', statusColor: 'bg-yellow-100 text-yellow-700' },
    { name: 'iPad Air', category:   'Tablets', date: 'Dec 7, 2024', status: 'In Stock', statusColor: 'bg-green-100 text-green-700' },
    { name: 'Surface Pro 9', category:  'Tablets', date: 'Dec 6, 2024', status: 'Out of Stock', statusColor: 'bg-red-100 text-red-700' },
  ];

  const users = [
    { name: "John Smith", email: "john.  smith@ihuza.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { name: "Sarah Johnson", email:  "sarah.j@ihuza.  com", role: "Manager", status: "Active", lastLogin: "5 hours ago" },
    { name: "Michael Brown", email:   "m.brown@ihuza.com", role: "Staff", status: "Active", lastLogin:  "1 day ago" },
    { name:  "Emily Davis", email: "emily.  d@ihuza.com", role: "Staff", status: "Inactive", lastLogin: "3 days ago" },
    { name:  "David Wilson", email:   "d.wilson@ihuza.com", role: "Staff", status: "Active", lastLogin: "6 hours ago" },
    { name:  "Lisa Anderson", email:   "l.anderson@ihuza.com", role: "Manager", status: "Active", lastLogin: "30 min ago" },
    { name:  "Robert Tyler", email:   "r.tyler@ihuza.com", role: "Staff", status: "Active", lastLogin: "2 days ago" },
    { name:  "Jennifer Miller", email:   "j.miller@ihuza.com", role: "Staff", status: "Active", lastLogin: "4 hours ago" },
    { name:  "Christopher Lee", email:   "c.lee@ihuza.com", role: "Admin", status: "Active", lastLogin: "1 hours ago" },
    { name:  "Amanda White", email:   "a.white@ihuza.com", role: "Staff", status: "Inactive", lastLogin: "1 week ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <Card className=" bg-linear-to-r from-blue-500 to-blue-600 border-0 text-black shadow-lg" padding="lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-400 text-white bg-opacity-20 rounded-lg flex items-center justify-center shrink-0">
            <Package className="w-7 h-7" />
          </div>
          <div className="flex-1 bg-color-black ">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              iHUZA INVENTORY - System Overview
            </h2>
            <p className="text-primary-100 mb-4">
              Monitor your iHUZA inventory and product assignments in real-time.  
            </p>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>
      {/* Recent Products */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Added Products</h3>
        </div>
        <div className="grid lg:grid-cols-3 gap-4">
          {recentProducts.map((product, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                <span className={`text-xs px-2 py-1 rounded font-medium ${product.statusColor}`}>
                  {product.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-xs text-gray-500 mt-1">{product.date}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className=" text-white-600 flex items-center justify-between mb-6">
          <h3 className="border-b border-gray-200 text-lg font-bold text-gray-900">Recent Users</h3>
          <Button variant="primary" size="sm">Add User</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">User</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Role</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Last Login</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user. email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                      user.  role === 'Manager' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' :  'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">Edit</button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Activity & Quick Actions - MOVED TO END */}
      <div className="grid lg: grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <a href="#" className="text-sm text-gray-400 hover:text-gray-600 font-medium variant='bordered'">View all</a>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl h-fit">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Product added to inventory</p>
                  <p className="text-sm text-gray-500 mt-1">MacBook Pro 16" M3 (PROD2024001)</p>
                  <p className="text-xs text-gray-400 mt-1">Dec 4, 2024</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl h-fit">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Product assigned to Sarah Johnson</p>
                  <p className="text-sm text-gray-500 mt-1">Dell ThinkPad X1 Carbon (PROD2024001)</p>
                  <p className="text-xs text-gray-400 mt-1">Dec 3, 2024</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl h-fit">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Product assigned to Michael Brown</p>
                  <p className="text-sm text-gray-500 mt-1">Apple MacBook Air M2 (PROD2024001)</p>
                  <p className="text-xs text-gray-400 mt-1">Dec 2, 2024</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-yellow-50 text-yellow-600 p-3 rounded-xl h-fit">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Product sent for maintenance</p>
                  <p className="text-sm text-gray-500 mt-1">HP Spectre x360 - Screen replacement required</p>
                  <p className="text-xs text-gray-400 mt-1">Jan 16, 2024</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-green-50 text-green-600 p-3 rounded-xl h-fit">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">New user registered</p>
                  <p className="text-sm text-gray-500 mt-1">Amanda White - Staff Member</p>
                  <p className="text-xs text-gray-400 mt-1">Jan 14, 2024</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-lg">View Users</p>
                      <p className="text-sm text-gray-600 mt-1">View all registered users</p>
                    </div>
                  </div>
                  <Button variant="primary" size="md">Go</Button>
                </div>
              </div>

              <div className="p-5 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <Package className="w-6 h-6 text-blue-600" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-lg">View Products</p>
                      <p className="text-sm text-gray-600 mt-1">View all registered products</p>
                    </div>
                  </div>
                  <Button variant="primary" size="md">Go</Button>
                </div>
              </div>

              <div className="p-5 bg-purple-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <AlignJustify className="w-6 h-6 text-purple-600" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-lg">View Assignments</p>
                      <p className="text-sm text-gray-600 mt-1">View all product assignments</p>
                    </div>
                  </div>
                  <Button variant="purple" size="md">Go</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;