"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home as HomeIcon, ArrowRight, Calendar, TrendingUp, DollarSign, MapPin, Building2, FileText } from "lucide-react";

type NewsCategory = "all" | "housing-trends" | "economic-finance" | "local-market" | "construction" | "policies";

interface NewsItem {
  id: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
}

const newsData: Record<NewsCategory, NewsItem[]> = {
  all: [],
  "housing-trends": [
    {
      id: "1",
      category: "housing-trends",
      title: "Home Prices Continue to Rise in Major Metropolitan Areas",
      excerpt: "The latest market analysis shows a 5.2% increase in median home prices across top 20 cities, driven by low inventory and strong buyer demand.",
      date: "2024-12-03",
      author: "Sarah Johnson",
    },
    {
      id: "2",
      category: "housing-trends",
      title: "Millennials Now Represent 43% of Home Buyers",
      excerpt: "A new study reveals that millennials have become the largest demographic of home buyers, with many entering the market for the first time.",
      date: "2024-12-01",
      author: "Michael Chen",
    },
    {
      id: "3",
      category: "housing-trends",
      title: "Suburban Markets See Record Growth in 2024",
      excerpt: "Suburban areas are experiencing unprecedented growth as remote work continues to influence housing preferences and location choices.",
      date: "2024-11-28",
      author: "Emily Rodriguez",
    },
    {
      id: "4",
      category: "housing-trends",
      title: "Luxury Home Sales Reach All-Time High",
      excerpt: "High-end properties over $1 million are seeing increased activity, with luxury markets outperforming the broader housing sector.",
      date: "2024-11-25",
      author: "David Kim",
    },
  ],
  "economic-finance": [
    {
      id: "5",
      category: "economic-finance",
      title: "Mortgage Rates Drop to 6.5%, Lowest in 6 Months",
      excerpt: "The Federal Reserve's recent policy changes have led to a significant drop in mortgage rates, making homeownership more accessible.",
      date: "2024-12-02",
      author: "Robert Williams",
    },
    {
      id: "6",
      category: "economic-finance",
      title: "First-Time Buyer Programs Expand Nationwide",
      excerpt: "New government initiatives are providing down payment assistance and favorable loan terms to help first-time buyers enter the market.",
      date: "2024-11-30",
      author: "Lisa Anderson",
    },
    {
      id: "7",
      category: "economic-finance",
      title: "Housing Affordability Index Improves for Third Consecutive Month",
      excerpt: "Rising incomes and stabilizing home prices are making housing more affordable for average American families.",
      date: "2024-11-27",
      author: "James Martinez",
    },
    {
      id: "8",
      category: "economic-finance",
      title: "Investment in Real Estate Tech Reaches $2.1B in Q4",
      excerpt: "Venture capital continues to flow into proptech startups, with AI-powered home search platforms leading the way.",
      date: "2024-11-24",
      author: "Patricia Lee",
    },
  ],
  "local-market": [
    {
      id: "9",
      category: "local-market",
      title: "Austin Real Estate Market Shows Strong Growth",
      excerpt: "The Texas capital continues to attract homebuyers with its tech job market and relatively affordable housing compared to coastal cities.",
      date: "2024-12-01",
      author: "Mark Thompson",
    },
    {
      id: "10",
      category: "local-market",
      title: "Denver Neighborhoods See 15% Price Increase",
      excerpt: "Popular neighborhoods in Denver are experiencing rapid appreciation, driven by migration from high-cost areas.",
      date: "2024-11-29",
      author: "Jennifer White",
    },
    {
      id: "11",
      category: "local-market",
      title: "Seattle Market Stabilizes After Years of Growth",
      excerpt: "After years of rapid price increases, Seattle's housing market is showing signs of stabilization with more balanced conditions.",
      date: "2024-11-26",
      author: "Christopher Brown",
    },
    {
      id: "12",
      category: "local-market",
      title: "Phoenix Emerges as Top Destination for Remote Workers",
      excerpt: "Affordable housing and warm climate are making Phoenix a popular choice for remote workers relocating from expensive markets.",
      date: "2024-11-23",
      author: "Amanda Davis",
    },
  ],
  construction: [
    {
      id: "13",
      category: "construction",
      title: "New Sustainable Housing Development Breaks Ground in Portland",
      excerpt: "A 500-unit eco-friendly development featuring solar panels and green building materials is set to open in 2025.",
      date: "2024-12-02",
      author: "Thomas Wilson",
    },
    {
      id: "14",
      category: "construction",
      title: "Modular Home Construction Gains Traction",
      excerpt: "Prefabricated and modular homes are becoming increasingly popular as they offer faster construction times and lower costs.",
      date: "2024-11-29",
      author: "Nancy Garcia",
    },
    {
      id: "15",
      category: "construction",
      title: "Smart Home Technology Integrated into New Builds",
      excerpt: "Developers are incorporating smart home features as standard, including automated lighting, security, and energy management systems.",
      date: "2024-11-26",
      author: "Kevin Taylor",
    },
    {
      id: "16",
      category: "construction",
      title: "Affordable Housing Projects Receive $500M in Funding",
      excerpt: "Federal and state governments are investing heavily in affordable housing construction to address the housing shortage.",
      date: "2024-11-22",
      author: "Rachel Moore",
    },
  ],
  policies: [
    {
      id: "17",
      category: "policies",
      title: "New Zoning Laws Aim to Increase Housing Density",
      excerpt: "Cities across the country are updating zoning regulations to allow for more multi-family housing and address affordability concerns.",
      date: "2024-12-01",
      author: "Daniel Jackson",
    },
    {
      id: "18",
      category: "policies",
      title: "Rent Control Measures Pass in Three Major Cities",
      excerpt: "Voters approved rent stabilization measures in several cities, aiming to protect tenants from rapid rent increases.",
      date: "2024-11-28",
      author: "Michelle Harris",
    },
    {
      id: "19",
      category: "policies",
      title: "First-Time Buyer Tax Credit Extended Through 2025",
      excerpt: "The federal government has extended tax credits for first-time homebuyers, providing up to $15,000 in assistance.",
      date: "2024-11-25",
      author: "Steven Clark",
    },
    {
      id: "20",
      category: "policies",
      title: "New Regulations for Short-Term Rentals Take Effect",
      excerpt: "Cities are implementing stricter regulations on Airbnb and other short-term rental platforms to preserve long-term housing stock.",
      date: "2024-11-21",
      author: "Laura Lewis",
    },
  ],
};

const categoryConfig: Record<NewsCategory, { label: string; icon: React.ElementType }> = {
  all: { label: "All News", icon: FileText },
  "housing-trends": { label: "Housing Market Trends", icon: TrendingUp },
  "economic-finance": { label: "Economic & Finance", icon: DollarSign },
  "local-market": { label: "Local Market News", icon: MapPin },
  construction: { label: "New Construction & Development", icon: Building2 },
  policies: { label: "Policies & Regulations", icon: FileText },
};

export default function NewsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDisplayNews = () => {
    if (activeCategory === "all") {
      return Object.values(newsData)
        .flat()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return newsData[activeCategory];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayNews = getDisplayNews();

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
              <a
                href="#features"
                className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Properties
              </a>
              <Link
                href="/learn"
                className="font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Learn
              </Link>
              <Link
                href="/news"
                className="font-medium text-green hover:text-green-dark transition-colors"
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
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-green-mint via-white to-green-mint/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Real Estate News & Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest trends, market updates, and policy changes affecting the housing market.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {Object.entries(categoryConfig).map(([key, config]) => {
              const Icon = config.icon;
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key as NewsCategory)}
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-green text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {config.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayNews.map((news) => {
                const CategoryIcon = categoryConfig[news.category].icon;
                return (
                  <article
                    key={news.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-sm text-green">
                          <CategoryIcon className="h-4 w-4 mr-1" />
                          <span className="font-medium">
                            {categoryConfig[news.category].label}
                          </span>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {news.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(news.date)}
                        </div>
                        <span>{news.author}</span>
                      </div>
                      <Link
                        href={`/news/${news.id}`}
                        className="mt-4 inline-flex items-center text-green hover:text-green-dark font-medium text-sm"
                      >
                        Read more
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No news articles found in this category.</p>
            </div>
          )}
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


