import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const  Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-pink-700 to-fuchsia-600 text-white py-10 px-6 sm:px-16 shadow-inner backdrop-blur-md bg-opacity-90 mt-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-yellow-300">ServiceDesk</h2>
          <p className="text-sm text-white/80">
            Efficiently manage tickets and support your users seamlessly.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-3 text-cyan-300">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li><a href="/dashboard" className="hover:text-yellow-300 transition">Dashboard</a></li>
            <li><a href="/tickets" className="hover:text-yellow-300 transition">My Tickets</a></li>
            <li><a href="/faq" className="hover:text-yellow-300 transition">FAQ</a></li>
            <li><a href="/support" className="hover:text-yellow-300 transition">Support</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-3 text-green-300">Stay Connected</h3>
          <div className="flex space-x-4 text-white text-xl">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaGithub /></a>
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-3 text-pink-200">Newsletter</h3>
          <p className="text-sm text-white/80 mb-2">Get the latest updates and tips.</p>
          <form className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-4 py-2 rounded">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-white/60 text-sm mt-10 border-t pt-5 border-white/20">
        © {new Date().getFullYear()} ServiceDesk | Kumar Satyam | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
