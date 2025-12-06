"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home as HomeIcon,
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  Edit,
  LogOut,
  ArrowLeft,
  Settings,
  Heart,
  FileText,
  MessageCircle,
} from "lucide-react";
import { getCurrentUser, logout, isAuthenticated } from "@/lib/auth";

export default function ProfilePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setIsCheckingAuth(false);
      const user = getCurrentUser();
      setCurrentUser(user);
    }
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-white shadow-sm"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <HomeIcon className="h-8 w-8 text-green" />
                <span className="text-xl font-bold text-gray-900">Homiehome</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/properties"
                className="font-medium text-gray-700 hover:text-green transition-colors"
              >
                Properties
              </Link>
              <Link
                href="/learn"
                className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/news"
                className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                News
              </Link>
              <Link
                href="/community"
                className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Community
              </Link>
              <Link
                href="/agents"
                className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Agents
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{currentUser.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-gray-700 hover:text-gray-900 border border-gray-300 hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-lg font-medium bg-green text-white hover:bg-green-dark transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Profile Content */}
      <div className="pt-24 pb-12 bg-gradient-to-br from-green-mint via-white to-green-mint/50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green to-green-dark flex items-center justify-center text-white text-3xl font-bold">
                  {currentUser?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentUser?.username || "User"}
                  </h1>
                  <p className="text-gray-600 mb-4">Member since December 2024</p>
                  <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-green-dark transition-colors flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </button>
                    <Link
                      href="/settings"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="text-gray-900 font-medium">{currentUser?.username || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">
                        {currentUser?.username}@example.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-gray-900 font-medium">December 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-mint rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-5 w-5 text-green" />
                      <span className="text-sm text-gray-600">Saved Properties</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="p-4 bg-green-mint rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-5 w-5 text-green" />
                      <span className="text-sm text-gray-600">Articles Read</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="p-4 bg-green-mint rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-green" />
                      <span className="text-sm text-gray-600">Community Posts</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <div className="p-4 bg-green-mint rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-5 w-5 text-green" />
                      <span className="text-sm text-gray-600">Profile Views</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    href="/properties"
                    className="block w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">Browse Properties</div>
                    <div className="text-sm text-gray-500">Find your dream home</div>
                  </Link>
                  <Link
                    href="/learn"
                    className="block w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">Learn More</div>
                    <div className="text-sm text-gray-500">Read buyer guides</div>
                  </Link>
                  <Link
                    href="/community"
                    className="block w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">Join Community</div>
                    <div className="text-sm text-gray-500">Ask questions</div>
                  </Link>
                </div>
              </div>

              {/* Account Security */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Password</span>
                    <button className="text-sm text-green hover:text-green-dark font-medium">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Two-Factor Auth</span>
                    <button className="text-sm text-green hover:text-green-dark font-medium">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
