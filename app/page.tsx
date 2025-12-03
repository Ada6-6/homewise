"use client";

import Link from "next/link";
import { 
  Search, 
  Mic, 
  Heart, 
  BookOpen, 
  CreditCard, 
  Calculator, 
  ClipboardCheck,
  Star,
  MessageCircle,
  Phone,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Home as HomeIcon
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <HomeIcon className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">NestAI</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/properties" className="text-gray-700 hover:text-gray-900 font-medium">
                Properties
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Learn
              </Link>
              <Link href="/agents" className="text-gray-700 hover:text-gray-900 font-medium">
                Agents
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Community
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Sign In
              </Link>
              <Link 
                href="#" 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6">
            AI-Powered Home Search
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Find Your Dream Home{" "}
            <span className="text-green-600">With AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Just describe what you&apos;re looking for in natural language. Our AI understands complex requirements and finds the perfect match.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-lg shadow-lg p-2">
              <Search className="h-5 w-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Describe your perfect home..."
                className="flex-1 px-4 py-3 outline-none text-gray-900"
              />
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Mic className="h-5 w-5" />
              </button>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Suggested Searches */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <span className="text-sm text-gray-500">Try:</span>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm transition-colors">
              3 bedroom house with pool under $500K in Austin
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm transition-colors">
              Modern condo near downtown with parking
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm transition-colors">
              Family home with good schools nearby
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm transition-colors">
              Pet-friendly apartment with balcony
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Properties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Match Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Properties</h2>
              <p className="text-gray-600">AI-curated listings matching your preferences and lifestyle requirements.</p>
            </div>
            <Link href="/properties" className="text-green-600 hover:text-green-700 font-medium flex items-center">
              View All Properties <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <div className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white text-xs font-medium rounded">
                    AI Match
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
                    <Heart className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-gray-900 mb-1">$485,000</div>
                  <div className="text-sm text-gray-600 mb-3">1234 Oak Valley Drive, Austin, TX</div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>3 beds</span>
                    <span>2 baths</span>
                    <span>1,850 sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Empower Your Home Buying Journey */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Empower Your Home Buying Journey</h2>
            <p className="text-gray-600">Free resources designed to help you make confident, informed decisions.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <BookOpen className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">First-Time Buyer Guide</h3>
                <p className="text-sm text-gray-600">Complete guide for first-time homebuyers</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <CreditCard className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Understanding Mortgages</h3>
                <p className="text-sm text-gray-600">Learn about mortgage options and rates</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <Calculator className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Budget Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your home buying budget</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <ClipboardCheck className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Home Inspection Checklist</h3>
                <p className="text-sm text-gray-600">Essential checklist for home inspections</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Home Buying Masterclass</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Pre-approval process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Market analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Offer strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">Closing procedures</span>
                </li>
              </ul>
              <Link 
                href="#" 
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
              >
                Start Learning Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Connect with Top Agents */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Connect with Top Agents</h2>
            <p className="text-gray-600">Our AI matches you with experienced agents who specialize in your needs and area.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { name: "Sarah Mitchell", rating: 4.9, specialization: "Luxury Home Specialist", location: "Austin, TX", reviews: 234, deals: 156 },
              { name: "Michael Chen", rating: 4.8, specialization: "First-Time Buyer Expert", location: "Austin, TX", reviews: 189, deals: 142 },
              { name: "Emma Rodriguez", rating: 5.0, specialization: "Investment Properties", location: "Austin, TX", reviews: 312, deals: 201 }
            ].map((agent, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-gray-900">{agent.rating}</span>
                    </div>
                    <div className="font-semibold text-gray-900">{agent.name}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">{agent.specialization}</div>
                <div className="text-sm text-gray-500 mb-4">{agent.location}</div>
                <div className="text-sm text-gray-500 mb-4">{agent.reviews} reviews • {agent.deals} deals</div>
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    <MessageCircle className="h-4 w-4 inline mr-2" />
                    Message
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Call
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/agents" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              Browse All Agents
            </Link>
          </div>
        </div>
      </section>

      {/* Join the Buyer Community */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Buyer Community</h2>
              <p className="text-gray-600 mb-8">
                Connect with other home buyers, share experiences, and get answers to your questions from our community of experts.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">15K+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">2.5K</div>
                  <div className="text-sm text-gray-600">Discussions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Questions Answered</div>
                </div>
              </div>
              
              <Link 
                href="#" 
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
              >
                Join Community <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {[
                { author: "John D.", title: "First-time buyer in Austin - any tips?", views: 234, comments: 12, time: "2h ago" },
                { author: "Maria S.", title: "How to negotiate in a hot market?", views: 189, comments: 8, time: "5h ago" },
                { author: "David L.", title: "Best neighborhoods for families?", views: 456, comments: 23, time: "1d ago" }
              ].map((post, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{post.author}</span>
                    <span className="text-xs text-gray-500">{post.time}</span>
                  </div>
                  <div className="text-gray-900 font-medium mb-2">{post.title}</div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{post.views} views</span>
                    <span>{post.comments} comments</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <HomeIcon className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-white">NestAI</span>
              </div>
              <p className="text-sm mb-4">AI-powered home search that understands your needs.</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Buyer Guide</Link></li>
                <li><Link href="#" className="hover:text-white">Mortgage Calculator</Link></li>
                <li><Link href="#" className="hover:text-white">Market Reports</Link></li>
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Properties</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/properties" className="hover:text-white">Buy</Link></li>
                <li><Link href="#" className="hover:text-white">Sell</Link></li>
                <li><Link href="#" className="hover:text-white">Rent</Link></li>
                <li><Link href="/agents" className="hover:text-white">Agent Directory</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm mb-4 md:mb-0">© 2024 NestAI. All rights reserved.</p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="hover:text-white">Privacy</Link>
                <Link href="#" className="hover:text-white">Terms</Link>
                <Link href="#" className="hover:text-white">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
