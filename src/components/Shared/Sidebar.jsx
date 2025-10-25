import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 min-h-screen p-4">
      <nav className="space-y-2">
        <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-200">
          Dashboard
        </Link>
        <Link to="/expenses" className="block px-4 py-2 rounded hover:bg-gray-200">
          Expenses
        </Link>
        <Link to="/income" className="block px-4 py-2 rounded hover:bg-gray-200">
          Income
        </Link>
        <Link to="/advisor" className="block px-4 py-2 rounded hover:bg-gray-200">
          Financial Advisor
        </Link>
        <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-200">
          Admin
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
