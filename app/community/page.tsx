"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  Search,
  MessageCircle,
  Heart,
  Eye,
  Clock,
  TrendingUp,
  HelpCircle,
  Home,
  DollarSign,
  FileText,
  Building2,
} from "lucide-react";

type Category = "all" | "first-time-buyer" | "financing" | "property-search" | "legal" | "general";

interface Question {
  id: string;
  title: string;
  content: string;
  category: Category;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  views: number;
  likes: number;
  answers: number;
  tags: string[];
  isSolved?: boolean;
  topAnswer?: {
    author: string;
    content: string;
    likes: number;
  };
}

const questionsData: Question[] = [
  {
    id: "1",
    title: "What should I look for in my first home inspection?",
    content: "I'm a first-time buyer and my inspection is scheduled next week. What are the most important things I should pay attention to?",
    category: "first-time-buyer",
    author: "Sarah M.",
    createdAt: "2024-12-03",
    views: 234,
    likes: 18,
    answers: 12,
    tags: ["inspection", "first-time-buyer", "advice"],
    isSolved: true,
    topAnswer: {
      author: "Expert Agent",
      content: "Focus on structural issues, electrical systems, plumbing, and HVAC. These are the most expensive to fix. Also check for water damage and foundation problems.",
      likes: 45,
    },
  },
  {
    id: "2",
    title: "How much should I save for a down payment?",
    content: "I'm planning to buy a home in the next 2 years. What's a realistic down payment amount I should aim for?",
    category: "financing",
    author: "John D.",
    createdAt: "2024-12-02",
    views: 456,
    likes: 32,
    answers: 25,
    tags: ["down-payment", "saving", "financing"],
    isSolved: true,
    topAnswer: {
      author: "Financial Advisor",
      content: "Aim for 20% to avoid PMI, but many programs accept 3-5%. Also save 3-5% for closing costs and 1-2% for moving/initial repairs.",
      likes: 67,
    },
  },
  {
    id: "3",
    title: "Is now a good time to buy in Austin, TX?",
    content: "I've been watching the Austin market for months. Prices seem high but inventory is low. Should I wait or buy now?",
    category: "property-search",
    author: "Maria S.",
    createdAt: "2024-12-01",
    views: 189,
    likes: 15,
    answers: 8,
    tags: ["austin", "market-timing", "location"],
    isSolved: false,
  },
  {
    id: "4",
    title: "What's the difference between pre-qualified and pre-approved?",
    content: "I keep hearing these terms but I'm confused about what they mean and which one I need.",
    category: "financing",
    author: "David L.",
    createdAt: "2024-11-30",
    views: 312,
    likes: 28,
    answers: 15,
    tags: ["mortgage", "pre-approval", "financing"],
    isSolved: true,
    topAnswer: {
      author: "Mortgage Expert",
      content: "Pre-qualified is a quick estimate based on self-reported info. Pre-approved means a lender has verified your finances and you're ready to make offers. Get pre-approved!",
      likes: 52,
    },
  },
  {
    id: "5",
    title: "How do I negotiate the best price on a house?",
    content: "Found a house I love but want to make sure I'm getting a fair deal. Any negotiation tips?",
    category: "general",
    author: "Emma R.",
    createdAt: "2024-11-29",
    views: 278,
    likes: 22,
    answers: 18,
    tags: ["negotiation", "pricing", "strategy"],
    isSolved: false,
  },
  {
    id: "6",
    title: "What are closing costs and who pays for them?",
    content: "My agent mentioned closing costs but I'm not sure what they include or if I need to pay them.",
    category: "legal",
    author: "Michael C.",
    createdAt: "2024-11-28",
    views: 198,
    likes: 14,
    answers: 10,
    tags: ["closing-costs", "legal", "fees"],
    isSolved: true,
    topAnswer: {
      author: "Real Estate Attorney",
      content: "Closing costs include loan origination fees, title insurance, appraisal, inspection, and escrow. Typically 2-5% of home price. Usually split between buyer and seller, but negotiable.",
      likes: 38,
    },
  },
  {
    id: "7",
    title: "Should I buy a fixer-upper as my first home?",
    content: "I found a great deal on a house that needs work. Is it worth it for a first-time buyer?",
    category: "first-time-buyer",
    author: "Lisa T.",
    createdAt: "2024-11-27",
    views: 167,
    likes: 11,
    answers: 9,
    tags: ["fixer-upper", "renovation", "first-time-buyer"],
    isSolved: false,
  },
  {
    id: "8",
    title: "How do I know if a neighborhood is safe?",
    content: "Moving to a new city and want to make sure I'm choosing a safe area. What resources should I use?",
    category: "property-search",
    author: "Robert W.",
    createdAt: "2024-11-26",
    views: 145,
    likes: 9,
    answers: 7,
    tags: ["neighborhood", "safety", "research"],
    isSolved: false,
  },
];

const categoryConfig: Record<Category, { label: string; icon: React.ElementType; color: string }> = {
  all: { label: "All Questions", icon: MessageCircle, color: "bg-gray-100 text-gray-700" },
  "first-time-buyer": {
    label: "First-Time Buyer",
    icon: HelpCircle,
    color: "bg-blue-100 text-blue-700",
  },
  financing: {
    label: "Financing",
    icon: DollarSign,
    color: "bg-green-100 text-green-700",
  },
  "property-search": {
    label: "Property Search",
    icon: Home,
    color: "bg-purple-100 text-purple-700",
  },
  legal: {
    label: "Legal & Contracts",
    icon: FileText,
    color: "bg-orange-100 text-orange-700",
  },
  general: {
    label: "General",
    icon: MessageCircle,
    color: "bg-gray-100 text-gray-700",
  },
};

export default function CommunityPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "unanswered">("recent");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredQuestions = questionsData.filter((q) => {
    const matchesCategory = activeCategory === "all" || q.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views + b.likes - (a.views + a.likes);
      case "unanswered":
        return a.answers - b.answers;
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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
                className="font-medium text-green hover:text-green-dark transition-colors"
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
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Community Forum
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ask questions, share experiences, and connect with other home buyers on their journey.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-green transition-colors"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
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

          {/* Sort Options */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="flex gap-2">
              {[
                { key: "recent", label: "Most Recent" },
                { key: "popular", label: "Most Popular" },
                { key: "unanswered", label: "Unanswered" },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key as typeof sortBy)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    sortBy === option.key
                      ? "bg-green text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Questions List */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {sortedQuestions.length} Question{sortedQuestions.length !== 1 ? "s" : ""}
            </h2>
            <Link
              href="/community/ask"
              className="inline-flex items-center px-4 py-2 bg-green text-white rounded-lg font-medium hover:bg-green-dark transition-colors"
            >
              Ask a Question
            </Link>
          </div>

          <div className="space-y-4">
            {sortedQuestions.map((question) => {
              const CategoryIcon = categoryConfig[question.category].icon;
              return (
                <article
                  key={question.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Stats Column */}
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="mb-2">
                        <div className="text-2xl font-bold text-gray-900">{question.answers}</div>
                        <div className="text-xs text-gray-500">answers</div>
                      </div>
                      <div className="mb-2">
                        <div className="text-lg font-semibold text-gray-700">{question.views}</div>
                        <div className="text-xs text-gray-500">views</div>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{question.likes}</span>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${categoryConfig[question.category].color}`}
                          >
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {categoryConfig[question.category].label}
                          </span>
                          {question.isSolved && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                              Solved
                            </span>
                          )}
                          {question.answers === 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700">
                              Unanswered
                            </span>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/community/${question.id}`}
                        className="block mb-2 group"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green transition-colors">
                          {question.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{question.content}</p>
                      </Link>

                      {/* Top Answer Preview */}
                      {question.topAnswer && (
                        <div className="bg-green-mint border-l-4 border-green rounded p-3 mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-green">Top Answer</span>
                            <span className="text-xs text-gray-600">by {question.topAnswer.author}</span>
                          </div>
                          <p className="text-sm text-gray-700 line-clamp-2">{question.topAnswer.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Heart className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-600">{question.topAnswer.likes} helpful</span>
                          </div>
                        </div>
                      )}

                      {/* Tags and Meta */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 cursor-pointer"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <span>{question.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(question.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {sortedQuestions.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No questions found. Try adjusting your filters or search terms.</p>
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


