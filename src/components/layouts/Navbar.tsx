/* eslint-disable prettier/prettier */
// import React from 'react';
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              Product Management
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <Link
                to="/"
                className="text-white hover:text-gray-400 font-semibold"
              >
                Products
              </Link>
              <Link
                to="/orders"
                className="text-white hover:text-gray-400 font-semibold"
              >
                Orders
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
