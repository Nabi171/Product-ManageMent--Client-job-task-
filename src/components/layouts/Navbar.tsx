/* eslint-disable prettier/prettier */
import { Link } from "react-router-dom"
import logo from "./logo.png" // import your logo image

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center animate-bounce">
              <img
                src={logo}
                alt="Product Management Logo"
                className="h-8 w-auto mr-2"
              />
            </Link>
            <span className="text-white font-bold text-xl">
              Product Management
            </span>
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
        </div>
      </div>
    </nav>
  )
}
