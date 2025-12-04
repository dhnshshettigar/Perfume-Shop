// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bannerStart to-accent flex items-center justify-center text-white font-bold">P</div>
            <div>
              <div className="text-lg font-bold">Perfume Shop</div>
              <div className="text-sm text-white/90">Luxury fragrances, handpicked for every moment.</div>
            </div>
          </div>

          <p className="text-sm text-white/80">
            Free delivery on orders over ₹1999. 30-day returns. Secure payments.
          </p>

          <div className="mt-4 flex gap-3">
            <a aria-label="Instagram" href="#" className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
              </svg>
            </a>
            <a aria-label="Twitter" href="#" className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a aria-label="Facebook" href="#" className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v7h4v-7h3l1-4h-4V6a1 1 0 011-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li><Link to="/" className="hover:underline">All perfumes</Link></li>
            <li><a href="#collections" className="hover:underline">Collections</a></li>
            <li><Link to="/" className="hover:underline">New arrivals</Link></li>
            <li><Link to="/" className="hover:underline">Offers</Link></li>
          </ul>
        </div>

        {/* Customer service */}
        <div>
          <h4 className="font-semibold mb-3">Customer Care</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
            <li><a href="#" className="hover:underline">Payment</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-3">Join our newsletter</h4>
          <p className="text-sm text-white/90 mb-3">Be the first to know about launches and exclusive offers.</p>

          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-3 py-2 rounded-md text-gray-900"
              required
            />
            <button type="submit" className="px-4 py-2 rounded-md bg-accent text-white">Subscribe</button>
          </form>

          <div className="text-xs text-white/80 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between text-sm text-white/80">
          <div>© {year} Perfume Shop. All rights reserved.</div>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
