import React from 'react';
import Chart from '../Shared/Chart';

function AdminDashboard() {
  const stats = {
    totalUsers: 1250,
    activeAdvisors: 8,
    pendingRequests: 23,
    totalRevenue: 45000
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.totalUsers.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Active Advisors</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.activeAdvisors}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Pending Requests</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {stats.pendingRequests}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart title="User Growth" type="line" />
        <Chart title="Revenue by Category" type="pie" />
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-2">
          <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
            New user registered: user@example.com
          </div>
          <div className="p-3 border-l-4 border-green-500 bg-green-50">
            Advisor request approved: Request #123
          </div>
          <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
            Pending notification: System maintenance
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
