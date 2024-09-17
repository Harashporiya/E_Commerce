import Link from "next/link";
import React from "react";

const FooterPage = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6">
            Stay updated with our latest offers and products!
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-3xl text-center font-bold mb-4">
            Shopping now in 2024
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <Link
              href="/"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Products
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
          <div className="text-center text-sm">
            <p>&copy; 2024 Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
