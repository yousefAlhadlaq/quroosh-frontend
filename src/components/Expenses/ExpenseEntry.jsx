import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

function ExpenseEntry() {
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  const [expenseList, setExpenseList] = useState([
    { id: 1, title: 'Groceries', amount: 250, date: '2024-01-05', category: 'Food' },
    { id: 2, title: 'Rent', amount: 1200, date: '2024-01-01', category: 'Housing' }
  ]);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add expense entry logic here
    const newExpense = {
      id: expenseList.length + 1,
      ...expense,
      amount: parseFloat(expense.amount)
    };
    setExpenseList([...expenseList, newExpense]);
    setExpense({ title: '', amount: '', date: '', category: '', description: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Expense Entry</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expense Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Title"
              type="text"
              name="title"
              value={expense.title}
              onChange={handleChange}
              required
            />
            <InputField
              label="Amount"
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              required
            />
            <InputField
              label="Date"
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={expense.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={expense.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <Button type="submit" variant="primary">
              Add Expense
            </Button>
          </form>
        </div>

        {/* Expense List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            {expenseList.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                  <p className="text-lg font-bold text-red-600">
                    ${item.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseEntry;
