import React, { useState } from 'react';
import { useAssignments } from '../context/AssignmentContext';
import { useProducts } from '../context/ProductContext';
import { useUsers } from '../context/UserContext';
import { useActivities } from '../context/ActivityContext';
import { useNotification } from '../context/NotificationContext';
import { ClipboardList, Plus, Edit, Trash2, Search, X, User, Package } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Assignments = () => {
  const { assignments, addAssignment, updateAssignment, deleteAssignment } = useAssignments();
  const { products } = useProducts();
  const { users } = useUsers();
  const { logActivity } = useActivities();
  const { showNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    userId: '',
    userName: '',
    status: 'active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProduct = products.find(p => p.id === formData.productId);
    const selectedUser = users.find(u => u.id === formData.userId);
    
    const assignmentData = {
      ...formData,
      productName: selectedProduct?.name || formData.productName,
      userName: selectedUser?.name || formData.userName,
    };

    if (editingAssignment) {
      updateAssignment(editingAssignment.id, assignmentData);
      logActivity({
        type: 'assignment_updated',
        title: 'Assignment updated',
        desc: `${assignmentData.productName} - ${assignmentData.userName}`,
        icon: 'ClipboardList'
      });
      showNotification(`Assignment for "${assignmentData.productName}" updated successfully!`, 'success');
    } else {
      addAssignment(assignmentData);
      logActivity({
        type: 'assignment_created',
        title: 'Product assigned',
        desc: `${assignmentData.productName} assigned to ${assignmentData.userName}`,
        icon: 'ClipboardList'
      });
      showNotification(`"${assignmentData.productName}" assigned to "${assignmentData.userName}" successfully!`, 'success');
    }
    resetForm();
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      productId: assignment.productId,
      productName: assignment.productName,
      userId: assignment.userId,
      userName: assignment.userName,
      status: assignment.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const assignment = assignments.find(a => a.id === id);
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(id);
      logActivity({
        type: 'assignment_deleted',
        title: 'Assignment deleted',
        desc: `${assignment?.productName} was unassigned from ${assignment?.userName}`,
        icon: 'ClipboardList'
      });
      showNotification(`Assignment for "${assignment?.productName}" deleted successfully!`, 'success');
    }
  };

  const resetForm = () => {
    setFormData({ productId: '', productName: '', userId: '', userName: '', status: 'active' });
    setEditingAssignment(null);
    setIsModalOpen(false);
  };

  const filteredAssignments = assignments.filter(assignment =>
    assignment.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      case 'returned': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-1">Manage product assignments to users</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Assignment
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Assignments</p>
              <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
          />
        </div>
      </Card>

      {/* Assignments Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Product</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Assigned To</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Assigned Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No assignments found
                  </td>
                </tr>
              ) : (
                filteredAssignments.map((assignment) => (
                  <tr key={assignment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{assignment.productName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-gray-700">{assignment.userName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(assignment)}
                          className="p-1 text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(assignment.id)}
                          className="p-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingAssignment ? 'Edit Assignment' : 'New Assignment'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                <select
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                  required
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                  required
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="returned">Returned</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={resetForm} fullWidth>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  {editingAssignment ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
