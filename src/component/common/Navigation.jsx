// src/component/common/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useResponsive from '../../hook/useResponsive';
import { useAuth } from '../../context/AuthContext';
import SearchBar from './SearchBar';

const Navigation = () => {
  const { isMobile } = useResponsive();

  // 修改这里，添加可选链操作符
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  const toggleMobileMenu = () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu?.classList.toggle('hidden');
  };

  return (
    <nav className={`container mx-auto px-4 ${isMobile ? 'py-2' : 'py-4'}`}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          OPUSOR
        </Link>

        {/* Desktop Navigation Links */}
        <div className={`${isMobile ? 'hidden' : 'flex items-center space-x-6'}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/category" className="nav-link">Explore</Link>
          <SearchBar/>
        </div>

        {/* Auth Buttons */}
        {!isMobile && (
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/user/dashboard" className="nav-link">My Account</Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:text-blue-700">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div className="mobile-menu hidden">
          <Link to="/" className="block py-2">Home</Link>
          <Link to="/categories" className="block py-2">Explore</Link>
          <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/user/dashboard" className="nav-link">My Account</Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:text-blue-700">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;