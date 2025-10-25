import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

function CategoryManager() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food', count: 15, total: 1250 },
    { id: 2, name: 'Housing', count: 3, total: 3600 },
    { id: 3, name: 'Transportation', count: 8, total: 450 },
    { id: 4, name: 'Entertainment', count: 6, total: 320 }
  ]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      const newCategory = {
        id: categories.length + 1,
        name: categoryName,
        count: 0,
        total: 0
      };
      setCategories([...categories, newCategory]);
      setCategoryName('');
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Category Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Category Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
          <form onSubmit={handleAddCategory}>
            <InputField
              label="Category Name"
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Education, Travel"
              required
            />
            <Button type="submit" variant="primary">
              Add Category
            </Button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Existing Categories</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 border border-gray-200 rounded flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">{category.name}</h4>
                  <p className="text-sm text-gray-600">
                    {category.count} transactions | ${category.total.toLocaleString()}
                  </p>
                </div>
                <Button
                  onClick={() => handleDeleteCategory(category.id)}
                  variant="danger"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryManager;
