import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Quroosh
          </Link>
          <div className="flex gap-4">
            {/* Add navigation links here */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
