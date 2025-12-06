"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  BookOpen,
  GraduationCap,
  DollarSign,
  Home,
  FileText,
  Search,
  Clock,
  User,
  ArrowRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

type Category = "all" | "first-time-buyer" | "financing" | "home-inspection" | "negotiation" | "closing";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  authorRole: string;
  readTime: number;
  publishedAt: string;
  image?: string;
  tags: string[];
  featured?: boolean;
}

const articlesData: Article[] = [
  {
    id: "1",
    title: "Complete First-Time Home Buyer Guide: Everything You Need to Know",
    excerpt: "A comprehensive guide covering all aspects of buying your first home, from saving for a down payment to closing the deal.",
    content: "Buying your first home is one of the most significant financial decisions you'll make...",
    category: "first-time-buyer",
    author: "Sarah Mitchell",
    authorRole: "Senior Real Estate Advisor",
    readTime: 15,
    publishedAt: "2024-12-01",
    tags: ["first-time-buyer", "guide", "basics"],
    featured: true,
  },
  {
    id: "2",
    title: "Understanding Mortgages: Types, Rates, and How to Get Pre-Approved",
    excerpt: "Learn about different mortgage types, how interest rates work, and the steps to get pre-approved for a home loan.",
    content: "Mortgages are complex financial products that can seem overwhelming...",
    category: "financing",
    author: "Michael Chen",
    authorRole: "Mortgage Specialist",
    readTime: 12,
    publishedAt: "2024-11-28",
    tags: ["mortgage", "financing", "pre-approval"],
    featured: true,
  },
  {
    id: "3",
    title: "Home Inspection Checklist: What to Look For Before You Buy",
    excerpt: "A detailed checklist of critical items to inspect when viewing a potential home purchase.",
    content: "A thorough home inspection can save you thousands of dollars...",
    category: "home-inspection",
    author: "David Rodriguez",
    authorRole: "Certified Home Inspector",
    readTime: 10,
    publishedAt: "2024-11-25",
    tags: ["inspection", "checklist", "buying"],
  },
  {
    id: "4",
    title: "How to Negotiate the Best Price on Your Dream Home",
    excerpt: "Expert strategies for negotiating the best deal, including when to make an offer and how to handle counteroffers.",
    content: "Negotiation is an art, especially when it comes to real estate...",
    category: "negotiation",
    author: "Emily Watson",
    authorRole: "Real Estate Negotiation Expert",
    readTime: 8,
    publishedAt: "2024-11-22",
    tags: ["negotiation", "pricing", "strategy"],
  },
  {
    id: "5",
    title: "Down Payment Strategies: How Much Do You Really Need?",
    excerpt: "Breaking down down payment requirements, PMI, and strategies to save for your first home purchase.",
    content: "The down payment is often the biggest hurdle for first-time buyers...",
    category: "financing",
    author: "Robert Kim",
    authorRole: "Financial Advisor",
    readTime: 9,
    publishedAt: "2024-11-20",
    tags: ["down-payment", "saving", "financing"],
  },
  {
    id: "6",
    title: "Closing Costs Explained: What to Expect on Closing Day",
    excerpt: "A complete breakdown of closing costs, who pays what, and how to prepare for closing day.",
    content: "Closing costs can come as a surprise to many first-time buyers...",
    category: "closing",
    author: "Lisa Anderson",
    authorRole: "Real Estate Attorney",
    readTime: 7,
    publishedAt: "2024-11-18",
    tags: ["closing", "costs", "legal"],
  },
  {
    id: "7",
    title: "10 Red Flags to Watch Out For When House Hunting",
    excerpt: "Learn to identify potential problems and warning signs during your home search that could save you from costly mistakes.",
    content: "House hunting can be exciting, but it's important to stay vigilant...",
    category: "home-inspection",
    author: "David Rodriguez",
    authorRole: "Certified Home Inspector",
    readTime: 6,
    publishedAt: "2024-11-15",
    tags: ["red-flags", "house-hunting", "warnings"],
  },
  {
    id: "8",
    title: "The Pre-Approval Process: Step-by-Step Guide",
    excerpt: "Everything you need to know about getting pre-approved for a mortgage, from documents needed to timeline expectations.",
    content: "Getting pre-approved is one of the first steps in your home buying journey...",
    category: "financing",
    author: "Michael Chen",
    authorRole: "Mortgage Specialist",
    readTime: 8,
    publishedAt: "2024-11-12",
    tags: ["pre-approval", "mortgage", "process"],
  },
  {
    id: "9",
    title: "Understanding Your Credit Score and How It Affects Your Mortgage",
    excerpt: "Learn how credit scores impact mortgage rates and what you can do to improve your score before applying.",
    content: "Your credit score plays a crucial role in determining your mortgage eligibility...",
    category: "financing",
    author: "Robert Kim",
    authorRole: "Financial Advisor",
    readTime: 7,
    publishedAt: "2024-11-10",
    tags: ["credit-score", "mortgage", "financing"],
  },
  {
    id: "10",
    title: "Making an Offer: When, How Much, and What to Include",
    excerpt: "Expert advice on crafting the perfect offer, including contingencies and negotiation tactics.",
    content: "Making an offer on a house requires careful consideration...",
    category: "negotiation",
    author: "Emily Watson",
    authorRole: "Real Estate Negotiation Expert",
    readTime: 9,
    publishedAt: "2024-11-08",
    tags: ["offer", "negotiation", "buying"],
  },
  {
    id: "11",
    title: "First-Time Buyer Programs and Grants You Should Know About",
    excerpt: "Discover federal, state, and local programs designed to help first-time buyers with down payments and closing costs.",
    content: "There are numerous programs available to assist first-time home buyers...",
    category: "first-time-buyer",
    author: "Sarah Mitchell",
    authorRole: "Senior Real Estate Advisor",
    readTime: 11,
    publishedAt: "2024-11-05",
    tags: ["grants", "programs", "first-time-buyer"],
  },
  {
    id: "12",
    title: "What Happens After You Make an Offer: The Escrow Process",
    excerpt: "A detailed walkthrough of the escrow process, from offer acceptance to closing day.",
    content: "Once your offer is accepted, the escrow process begins...",
    category: "closing",
    author: "Lisa Anderson",
    authorRole: "Real Estate Attorney",
    readTime: 10,
    publishedAt: "2024-11-03",
    tags: ["escrow", "closing", "process"],
  },
];

const categoryConfig: Record<Category, { label: string; icon: React.ElementType; description: string }> = {
  all: {
    label: "All Guides",
    icon: BookOpen,
    description: "Browse all buyer guides and expert articles",
  },
  "first-time-buyer": {
    label: "First-Time Buyer",
    icon: GraduationCap,
    description: "Essential guides for first-time home buyers",
  },
  financing: {
    label: "Financing & Mortgages",
    icon: DollarSign,
    description: "Learn about mortgages, loans, and financing options",
  },
  "home-inspection": {
    label: "Home Inspection",
    icon: Home,
    description: "What to look for when inspecting a property",
  },
  negotiation: {
    label: "Negotiation",
    icon: TrendingUp,
    description: "Strategies for negotiating the best deal",
  },
  closing: {
    label: "Closing Process",
    icon: FileText,
    description: "Understanding the closing and escrow process",
  },
};

export default function LearnPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredArticles = articlesData.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                className="font-medium text-green hover:text-green-dark transition-colors"
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
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green text-white mb-6">
              <GraduationCap className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Buyer Guide: Learn from Experts</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Learn from Real Estate Experts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides and expert advice to help you navigate every step of your home buying journey.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search guides, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-green transition-colors"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {Object.entries(categoryConfig).map(([key, config]) => {
              const Icon = config.icon;
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key as Category)}
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

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Guides</h2>
              <p className="text-gray-600">Start here with our most popular expert guides</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => {
                const CategoryIcon = categoryConfig[article.category].icon;
                return (
                  <Link
                    key={article.id}
                    href={`/learn/${article.id}`}
                    className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-green text-white rounded text-xs font-medium">
                        Featured
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <CategoryIcon className="h-4 w-4 mr-1" />
                        {categoryConfig[article.category].label}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime} min read</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-green group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className={`py-12 ${featuredArticles.length > 0 ? "bg-gray-50" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {activeCategory === "all" ? "All Guides" : categoryConfig[activeCategory].label}
            </h2>
            <p className="text-gray-600">
              {activeCategory === "all"
                ? "Browse all expert guides and articles"
                : categoryConfig[activeCategory].description}
            </p>
          </div>

          {regularArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => {
                const CategoryIcon = categoryConfig[article.category].icon;
                return (
                  <Link
                    key={article.id}
                    href={`/learn/${article.id}`}
                    className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryIcon className="h-4 w-4 text-green" />
                      <span className="text-sm text-gray-600">
                        {categoryConfig[article.category].label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime} min</span>
                        </div>
                        <span>•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No articles found. Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-mint">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our community forum to ask questions and get advice from other home buyers and experts.
          </p>
          <Link
            href="/community"
            className="inline-flex items-center px-6 py-3 bg-green text-white rounded-lg font-medium hover:bg-green-dark transition-colors"
          >
            Visit Community Forum
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
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


