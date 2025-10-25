import React from 'react';
import Chart from '../Shared/Chart';

function DashboardPage() {
  const stats = {
    totalIncome: 15000,
    totalExpenses: 8500,
    savings: 6500,
    zakahDue: 375
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Financial Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ${stats.totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            ${stats.totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Savings</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${stats.savings.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm">Zakah Due</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${stats.zakahDue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Chart title="Monthly Income vs Expenses" type="bar" />
        <Chart title="Expense Categories" type="pie" />
      </div>
    </div>
  );
}

export default DashboardPage;
