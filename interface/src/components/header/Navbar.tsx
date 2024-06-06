import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.svg';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full z-10 ">
      <div className=" mx-auto px-4 py-2 flex justify-between items-center">
        <img className='h-12 w-56' src={logo} alt="logo" />
        <ul className="hidden md:flex md:items-center">
          <li className="md:mx-4 my-2 md:my-0">
            <Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link>
          </li>
          <li className="md:mx-4 my-2 md:my-0">
            <Link to="/about" className="text-gray-800 hover:text-gray-600">About Us</Link>
          </li>
          <li className="md:mx-4 my-2 md:my-0">
            <Link to="/services" className="text-gray-800 hover:text-gray-600">Services</Link>
          </li>

          <li className="md:mx-4 my-2 md:my-0">
            <Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact Us</Link>
          </li>

        </ul>
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? <FaTimes size={28} /> : <FaBars size={22} />}
        </button>
      </div>
      <div className={`drop-shadow-2xl fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity ${isMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobile(false)}></div>
      <div className={`fixed top-0 left-0 w-64 bg-white h-full shadow-md transform transition-transform ${isMobile ? 'translate-x-0 z-20' : '-translate-x-full'}`}>
        <ul className="flex flex-col items-start p-4">
          <li className="my-6 w-full">
            <Link to="/" className="text-gray-800 hover:text-gray-600 w-full block" onClick={() => setIsMobile(false)}>Home</Link>
          </li>
          <li className="my-6 w-full">
            <Link to="/about" className="text-gray-800 hover:text-gray-600 w-full block" onClick={() => setIsMobile(false)}>About Us</Link>
          </li>
          <li className="my-6 w-full">
            <Link to="/services" className="text-gray-800 hover:text-gray-600 w-full block" onClick={() => setIsMobile(false)}>Services</Link>
          </li>

          <li className="my-6 w-full">
            <Link to="/contact" className="text-gray-800 hover:text-gray-600 w-full block" onClick={() => setIsMobile(false)}>Contact Us</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
