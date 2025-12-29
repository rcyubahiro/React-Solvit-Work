export const initializeData = () => {
  // Initialize users if no users exist
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.length === 0) {
    const sampleUsers = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@ihuza.com',
        password: 'admin123',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2024-12-10T10:30:00.000Z',
        createdAt: '2024-01-15T08:00:00.000Z',
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@ihuza.com',
        password: 'password123',
        role: 'Manager',
        status: 'Active',
        lastLogin: '2024-12-10T09:45:00.000Z',
        createdAt: '2024-02-20T09:00:00.000Z',
      },
      {
        id: '3',
        name: 'Michael Brown',
        email: 'michael@ihuza.com',
        password: 'password123',
        role: 'Staff',
        status: 'Active',
        lastLogin: '2024-12-09T14:20:00.000Z',
        createdAt: '2024-03-10T10:00:00.000Z',
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily@ihuza.com',
        password: 'password123',
        role: 'Staff',
        status: 'Inactive',
        lastLogin: '2024-11-25T11:00:00.000Z',
        createdAt: '2024-04-05T11:00:00.000Z',
      },
      {
        id: '5',
        name: 'James Wilson',
        email: 'james@ihuza.com',
        password: 'password123',
        role: 'Manager',
        status: 'Active',
        lastLogin: '2024-12-10T08:15:00.000Z',
        createdAt: '2024-05-12T14:00:00.000Z',
      },
      {
        id: '6',
        name: 'Jessica Martinez',
        email: 'jessica@ihuza.com',
        password: 'password123',
        role: 'Staff',
        status: 'Active',
        lastLogin: '2024-12-08T16:30:00.000Z',
        createdAt: '2024-06-18T09:30:00.000Z',
      },
    ];
    localStorage.setItem('users', JSON.stringify(sampleUsers));
    console.log('✅ Sample users initialized');
  }

  // Initialize sample products if no products exist
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  if (products.length === 0) {
    const sampleProducts = [
      { id: '1', name: 'MacBook Pro 16"', category: 'Laptops', status: 'In Stock', quantity: 15, price: '2499', createdAt: '2024-12-10T10:00:00.000Z' },
      { id: '2', name: 'Dell XPS 13', category: 'Laptops', status: 'In Stock', quantity: 20, price: '1299', createdAt: '2024-12-09T10:00:00.000Z' },
      { id: '3', name: 'iPhone 15 Pro', category: 'Mobile', status: 'Low Stock', quantity: 5, price: '999', createdAt: '2024-12-08T10:00:00.000Z' },
      { id: '4', name: 'iPad Air', category: 'Tablets', status: 'In Stock', quantity: 12, price: '599', createdAt: '2024-12-07T10:00:00.000Z' },
      { id: '5', name: 'Surface Pro 9', category: 'Tablets', status: 'Out of Stock', quantity: 0, price: '1099', createdAt: '2024-12-06T10:00:00.000Z' },
      { id: '6', name: 'AirPods Pro', category: 'Accessories', status: 'In Stock', quantity: 50, price: '249', createdAt: '2024-12-05T10:00:00.000Z' },
      { id: '7', name: 'Samsung Galaxy S24', category: 'Mobile', status: 'In Stock', quantity: 25, price: '899', createdAt: '2024-12-04T10:00:00.000Z' },
      { id: '8', name: 'HP Spectre x360', category: 'Laptops', status: 'In Stock', quantity: 8, price: '1499', createdAt: '2024-12-03T10:00:00.000Z' },
      { id: '9', name: 'Apple Watch Ultra', category: 'Wearables', status: 'Low Stock', quantity: 3, price: '799', createdAt: '2024-12-02T10:00:00.000Z' },
      { id: '10', name: 'Sony WH-1000XM5', category: 'Accessories', status: 'In Stock', quantity: 30, price: '349', createdAt: '2024-12-01T10:00:00.000Z' },
    ];
    localStorage.setItem('products', JSON.stringify(sampleProducts));
    console.log('✅ Sample products initialized');
  }

  // Initialize sample categories if no categories exist
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  if (categories.length === 0) {
    const sampleCategories = [
      { id: '1', name: 'Laptops', description: 'Portable computers and notebooks', productCount: 3 },
      { id: '2', name: 'Mobile', description: 'Smartphones and mobile devices', productCount: 2 },
      { id: '3', name: 'Tablets', description: 'Tablet computers and e-readers', productCount: 2 },
      { id: '4', name: 'Accessories', description: 'Tech accessories and peripherals', productCount: 2 },
      { id: '5', name: 'Wearables', description: 'Smartwatches and fitness trackers', productCount: 1 },
    ];
    localStorage.setItem('categories', JSON.stringify(sampleCategories));
    console.log('✅ Sample categories initialized');
  }
};