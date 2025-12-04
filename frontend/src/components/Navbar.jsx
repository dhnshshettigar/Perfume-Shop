// client/src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bannerStart to-accent flex items-center justify-center text-white font-bold">P</div>
              <div className="text-lg font-bold text-primary">Perfume Shop</div>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-gray-700 hover:text-primary">Home</Link>
            <a href="#collections" className="text-sm text-gray-700 hover:text-primary">Collections</a>
            <Link to="/" className="text-sm text-gray-700 hover:text-primary">Offers</Link>
            <Link to="/" className="text-sm text-gray-700 hover:text-primary">Contact</Link>

            <div className="ml-4 flex items-center gap-3">
              <button className="px-3 py-1 text-sm border rounded-md">Sign in</button>
              <button className="btn bg-primary text-white text-sm">Cart</button>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {open ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden transition-max-h duration-300 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-4 pb-4">
          <nav className="flex flex-col gap-2 py-3">
            <Link to="/" onClick={() => setOpen(false)} className="text-base text-gray-700 hover:text-primary">Home</Link>
            <a href="#collections" onClick={() => setOpen(false)} className="text-base text-gray-700 hover:text-primary">Collections</a>
            <Link to="/" onClick={() => setOpen(false)} className="text-base text-gray-700 hover:text-primary">Offers</Link>
            <Link to="/" onClick={() => setOpen(false)} className="text-base text-gray-700 hover:text-primary">Contact</Link>
          </nav>

          <div className="flex gap-3 pt-2">
            <button className="flex-1 px-3 py-2 border rounded-md">Sign in</button>
            <button className="flex-1 btn bg-primary text-white">Cart</button>
          </div>
        </div>
      </div>
    </header>
  );
}
