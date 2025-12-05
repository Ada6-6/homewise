"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home as HomeIcon, ArrowRight } from "lucide-react";

export default function NotFound() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <HomeIcon className="h-8 w-8 text-green" />
                <span
                  className={`text-xl font-bold transition-colors ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  Homiehome
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Home
              </Link>
              <a
                href="#features"
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Properties
              </a>
              <Link
                href="/learn"
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Learn
              </Link>
              <Link
                href="/news"
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                News
              </Link>
              <Link
                href="/community"
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Community
              </Link>
              <Link
                href="/agents"
                className={`font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Agents
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-gray-900"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "bg-green text-white hover:bg-green-dark"
                    : "bg-green text-white hover:bg-green-dark"
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* 404 Content */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-mint via-white to-green-mint/50 z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-green mb-4 animate-fade-in">
              404
            </h1>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/"
              className="px-8 py-4 bg-green text-white rounded-lg font-medium hover:bg-green-dark transition-colors flex items-center"
            >
              <HomeIcon className="mr-2 h-5 w-5" />
              Go to Home
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/agents"
              className="px-8 py-4 border-2 border-green text-green rounded-lg font-medium hover:bg-green hover:text-white transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/properties"
                className="text-sm text-green hover:text-green-dark font-medium"
              >
                Properties
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/learn"
                className="text-sm text-green hover:text-green-dark font-medium"
              >
                Learn
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/community"
                className="text-sm text-green hover:text-green-dark font-medium"
              >
                Community
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/agents"
                className="text-sm text-green hover:text-green-dark font-medium"
              >
                Agents Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <HomeIcon className="h-8 w-8 text-green" />
                <span className="text-xl font-bold">Homiehome</span>
              </div>
              <p className="text-gray-400 text-sm">
                Finding a home journey, no longer alone.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <Link href="/learn" className="hover:text-white">
                    Learn
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <Link href="/news" className="hover:text-white">
                    News
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm">
              © 2024 Homiehome. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
