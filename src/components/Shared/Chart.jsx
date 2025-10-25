import React from 'react';

function Chart({ title, type = 'bar', data }) {
  // This is a placeholder for chart component
  // You can integrate libraries like Chart.js or Recharts later

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
        <p className="text-gray-500">Chart placeholder - {type}</p>
      </div>
    </div>
  );
}

export default Chart;
