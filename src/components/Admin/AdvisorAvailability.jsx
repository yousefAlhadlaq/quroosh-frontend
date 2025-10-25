import React, { useState } from 'react';
import Button from '../Shared/Button';

function AdvisorAvailability() {
  const [advisors, setAdvisors] = useState([
    {
      id: 1,
      name: 'Ahmed Al-Saud',
      specialty: 'Investment',
      status: 'available',
      sessions: 45,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Fatima Hassan',
      specialty: 'Zakah & Islamic Finance',
      status: 'available',
      sessions: 62,
      rating: 4.9
    },
    {
      id: 3,
      name: 'Omar Ibrahim',
      specialty: 'Budgeting & Savings',
      status: 'busy',
      sessions: 38,
      rating: 4.7
    },
    {
      id: 4,
      name: 'Sara Abdullah',
      specialty: 'Debt Management',
      status: 'offline',
      sessions: 29,
      rating: 4.6
    }
  ]);

  const toggleStatus = (id, newStatus) => {
    setAdvisors(
      advisors.map((advisor) =>
        advisor.id === id ? { ...advisor, status: newStatus } : advisor
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Advisor Availability Management</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Specialty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Sessions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {advisors.map((advisor) => (
              <tr key={advisor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{advisor.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{advisor.specialty}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{advisor.sessions}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">⭐ {advisor.rating}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      advisor.status
                    )}`}
                  >
                    {advisor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    value={advisor.status}
                    onChange={(e) => toggleStatus(advisor.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdvisorAvailability;
