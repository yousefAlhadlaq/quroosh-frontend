import React, { useState } from 'react';
import Button from '../Shared/Button';
import InputField from '../Shared/InputField';

function FinancialAdvicePage() {
  const [request, setRequest] = useState({
    category: '',
    description: '',
    preferredTime: ''
  });

  const [advisors] = useState([
    { id: 1, name: 'Ahmed Al-Saud', specialty: 'Investment', available: true },
    { id: 2, name: 'Fatima Hassan', specialty: 'Zakah & Islamic Finance', available: true },
    { id: 3, name: 'Omar Ibrahim', specialty: 'Budgeting & Savings', available: false }
  ]);

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add advisor request logic here
    console.log('Advisor Request:', request);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Financial Advisor</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Request Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Request Advice</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={request.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="investment">Investment</option>
                <option value="zakah">Zakah</option>
                <option value="budgeting">Budgeting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={request.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <InputField
              label="Preferred Time"
              type="datetime-local"
              name="preferredTime"
              value={request.preferredTime}
              onChange={handleChange}
            />
            <Button type="submit" variant="primary">
              Submit Request
            </Button>
          </form>
        </div>

        {/* Available Advisors */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Available Advisors</h3>
          <div className="space-y-3">
            {advisors.map((advisor) => (
              <div
                key={advisor.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{advisor.name}</h4>
                    <p className="text-sm text-gray-600">{advisor.specialty}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      advisor.available
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {advisor.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancialAdvicePage;
