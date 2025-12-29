import React, { useState } from 'react';
import { useCategories } from '../context/CategoryContext';
import { useActivities } from '../context/ActivityContext';
import { useNotification } from '../context/NotificationContext';
import { Layers, Plus, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';


const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { logActivity } = useActivities();
  const { showNotification } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
      logActivity({
        type: 'category_updated',
        title: 'Category updated',
        desc: `${formData.name} - ${formData.description}`,
        icon: 'Layers'
      });
      showNotification(`Category "${formData.name}" updated successfully!`, 'success');
    } else {
      addCategory(formData);
      logActivity({
        type: 'category_added',
        title: 'Category created',
        desc: `${formData.name}`,
        icon: 'Layers'
      });
      showNotification(`Category "${formData.name}" created successfully!`, 'success');
    }
    resetForm();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const category = categories.find(c => c.id === id);
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
      logActivity({
        type: 'category_deleted',
        title: 'Category deleted',
        desc: `${category?.name} was removed`,
        icon: 'Layers'
      });
      showNotification(`Category "${category?.name}" deleted successfully!`, 'success');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '' });
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Layers className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Layers className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(c => c.productCount > 0).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Description</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Products</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Layers className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{category.description}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-gray-900">{category.productCount || 0}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Delete
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                  placeholder="e.g. Electronics"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900"
                  placeholder="Describe this category..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" fullWidth onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  {editingCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
