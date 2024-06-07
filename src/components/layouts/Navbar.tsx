/* eslint-disable prettier/prettier */
// import React from 'react';
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#" className="text-white font-bold text-xl">
              Product Management System
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                Products
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Orders
              </a>
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
