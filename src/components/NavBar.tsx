import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import { Store } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Store className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Mi Tienda</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
              end
            >
              Inicio
            </NavLink>
            <NavLink 
              to="/category/electronica" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Electrónica
            </NavLink>
            <NavLink 
              to="/category/ropa" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Ropa
            </NavLink>
            <NavLink 
              to="/category/hogar" 
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Hogar
            </NavLink>
          </div>

          {/* Cart Widget */}
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;