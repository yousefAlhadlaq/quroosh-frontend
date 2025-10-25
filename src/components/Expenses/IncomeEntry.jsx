import React, { useState } from 'react';
import InputField from '../Shared/InputField';
import Button from '../Shared/Button';

function IncomeEntry() {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  const [incomeList, setIncomeList] = useState([
    { id: 1, source: 'Salary', amount: 5000, date: '2024-01-01', category: 'Employment' },
    { id: 2, source: 'Freelance', amount: 1500, date: '2024-01-15', category: 'Business' }
  ]);

  const handleChange = (e) => {
    setIncome({
      ...income,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add income entry logic here
    const newIncome = {
      id: incomeList.length + 1,
      ...income,
      amount: parseFloat(income.amount)
    };
    setIncomeList([...incomeList, newIncome]);
    setIncome({ source: '', amount: '', date: '', category: '', description: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Income Entry</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Add Income</h3>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Source"
              type="text"
              name="source"
              value={income.source}
              onChange={handleChange}
              required
            />
            <InputField
              label="Amount"
              type="number"
              name="amount"
              value={income.amount}
              onChange={handleChange}
              required
            />
            <InputField
              label="Date"
              type="date"
              name="date"
              value={income.date}
              onChange={handleChange}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={income.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Employment">Employment</option>
                <option value="Business">Business</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={income.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <Button type="submit" variant="primary">
              Add Income
            </Button>
          </form>
        </div>

        {/* Income List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Income</h3>
          <div className="space-y-3">
            {incomeList.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{item.source}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                  <p className="text-lg font-bold text-green-600">
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

export default IncomeEntry;
