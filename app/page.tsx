"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  Clock,
  DollarSign,
  AlertTriangle,
  MapPin,
  Home as HomeIcon,
  MessageCircle,
  FileText,
  Link as LinkIcon,
  CheckCircle,
  User,
  Briefcase,
  Wrench,
  Building2,
  Play,
  GraduationCap,
  Search,
  LogOut,
} from "lucide-react";
import { isAuthenticated, getCurrentUser, logout } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const sections = sectionsRef.current;
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Observe individual cards
    const cards = cardsRef.current;
    cards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      cards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

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
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <HomeIcon className="h-8 w-8 text-green" />
                <span
                  className={`text-xl font-bold transition-colors ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  Homiehome
                </span>
              </div>
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
              <Link
                href="/properties"
                className={`inline-flex items-center gap-1.5 font-medium transition-all ${
                  isScrolled
                    ? "text-gray-700 hover:text-green"
                    : "text-white hover:text-green-light"
                }`}
              >
                <Search className="h-4 w-4" />
                Properties
              </Link>
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
              {currentUser ? (
                <>
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isScrolled
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{currentUser.username}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900 border border-gray-300 hover:bg-gray-50"
                        : "text-white hover:text-gray-200 border border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80')] bg-cover bg-center" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Overlay Pill */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white mb-6 animate-fade-in">
            <Heart className="h-4 w-4 text-green mr-2" />
            <span className="text-green text-sm font-medium">
              Your AI Companion for Home Buying
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Finding a home journey, no longer alone
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-slide-up-delay">
            The first AI platform built for first-time home buyers. Get 24/7
            support, explore homes in immersive virtual spaces, and never feel
            anxious again.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-slide-up-delay-2">
            <Link
              href="/register"
              className="px-6 py-3 bg-green text-white rounded-lg font-medium hover:bg-green-dark transition-colors flex items-center"
            >
              Sign Up to Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border-2 border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center"
            >
              Sign In
            </Link>
          </div>

          {/* Feature List */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm animate-fade-in-delay">
            <span>Available 24/7</span>
            <span className="hidden sm:inline">•</span>
            <span>No Pressure</span>
            <span className="hidden sm:inline">•</span>
            <span>Free to Start</span>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section
        id="features"
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        className="py-20 lg:py-32 bg-green-mint scroll-animate"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              First-Time Home Buyers Are
            </h2>
            <h2 className="text-4xl sm:text-5xl font-bold text-green mb-6">
              Drowning in Anxiety
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Existing platforms are overwhelming, pushy, and don&apos;t
              understand the emotional journey of first-time buyers. You&apos;re
              left feeling lost, anxious, and alone in the biggest purchase of
              your life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: "Overwhelming Anxiety",
                description:
                  "Too many options, too much information, and no guidance on what matters.",
              },
              {
                icon: Clock,
                title: "Always Waiting",
                description:
                  "Agents are busy, responses are slow, and you feel like you&apos;re not a priority.",
              },
              {
                icon: DollarSign,
                title: "Fear of Scams",
                description:
                  "Worried about hidden fees, bad deals, and making costly mistakes.",
              },
              {
                icon: MapPin,
                title: "Lost & Alone",
                description:
                  "No one to answer your questions or support you through the process.",
              },
            ].map((point, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 card-animate"
              >
                <div className="w-12 h-12 rounded-full bg-green-mint border-2 border-green-light flex items-center justify-center mb-4">
                  <point.icon className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-2">
              The $2.4 trillion real estate industry is built for agents, not
              buyers.
            </p>
            <p className="text-green font-semibold text-lg">
              We&apos;re changing that.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className="py-20 lg:py-32 bg-white scroll-animate"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Your AI Companion That
            </h2>
            <h2 className="text-4xl sm:text-5xl font-bold text-green mb-6">
              Walks With You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;ve built the first platform that understands the emotional
              journey of buying your first home. Get personalized support,
              explore homes virtually, and learn at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: MessageCircle,
                iconBg: "bg-teal-100",
                iconColor: "text-teal-600",
                borderColor: "border-t-4 border-teal-400",
                title: "24/7 AI Companion",
                description:
                  "Chat anytime, anywhere. Get instant answers to your questions, personalized recommendations, and emotional support throughout your journey.",
                bgColor: "bg-white",
                textColor: "text-gray-900",
              },
              {
                icon: HomeIcon,
                iconBg: "bg-teal-100",
                iconColor: "text-teal-600",
                borderColor: "border-t-4 border-teal-400",
                title: "Immersive Virtual Spaces",
                description:
                  "Explore homes in stunning 3D virtual tours. Walk through properties from your couch, see every detail, and make informed decisions.",
                bgColor: "bg-white",
                textColor: "text-gray-900",
              },
              {
                icon: Heart,
                iconBg: "bg-green",
                iconColor: "text-white",
                borderColor: "",
                title: "Emotional Support Built-In",
                description:
                  "We understand buying a home is emotional. Our AI provides empathy, encouragement, and helps you navigate the stress and excitement.",
                bgColor: "bg-green",
                textColor: "text-white",
              },
              {
                icon: GraduationCap,
                iconBg: "bg-green",
                iconColor: "text-white",
                borderColor: "",
                title: "Gamified Learning",
                description:
                  "Learn about mortgages, inspections, and negotiations through interactive modules. Make learning fun and build confidence step by step.",
                bgColor: "bg-green",
                textColor: "text-white",
              },
            ].map((solution, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[4 + idx] = el;
                }}
                className={`${solution.bgColor} ${solution.borderColor} border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 card-animate`}
              >
                <div
                  className={`w-16 h-16 ${solution.iconBg} rounded-lg flex items-center justify-center mb-6`}
                >
                  <solution.icon className={`h-8 w-8 ${solution.iconColor}`} />
                </div>
                <h3 className={`text-xl font-bold ${solution.textColor} mb-3`}>
                  {solution.title}
                </h3>
                <p className={solution.textColor === "text-white" ? "text-white/90" : "text-gray-600"}>
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="py-20 lg:py-32 bg-green-mint scroll-animate"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Four simple steps to finding your home—with a companion by your side every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                icon: MessageCircle,
                title: "Start Chatting",
                description:
                  "Begin a conversation with our AI companion. Share your preferences, budget, and what you&apos;re looking for.",
              },
              {
                number: "02",
                icon: HomeIcon,
                title: "Explore Virtually",
                description:
                  "Browse curated properties and take immersive virtual tours. See every detail from the comfort of your home.",
              },
              {
                number: "03",
                icon: LinkIcon,
                title: "Connect Seamlessly",
                description:
                  "When you&apos;re ready, we connect you with trusted agents, lenders, and contractors in our network.",
              },
              {
                number: "04",
                icon: CheckCircle,
                title: "Close with Confidence",
                description:
                  "Get support through every step of closing. Our AI guides you through paperwork, negotiations, and final steps.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[8 + idx] = el;
                }}
                className="text-center step-animate"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-16 h-16 bg-green-mint rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green">
                      {step.number}
                    </span>
                  </div>
                  <div className="w-12 h-12 border-2 border-green rounded-lg flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-green" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section
        id="ecosystem"
        ref={(el) => {
          sectionsRef.current[3] = el;
        }}
        className="py-20 lg:py-32 bg-white scroll-animate"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              One Seamless Ecosystem
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;ve connected all the key players in your home-buying
              journey. From agents to contractors to lenders, everyone works
              together seamlessly through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: User,
                    title: "Buyers",
                    description: "First-time home buyers get personalized AI support",
                  },
                  {
                    icon: Briefcase,
                    title: "Agents",
                    description: "Trusted real estate professionals in our network",
                  },
                  {
                    icon: Wrench,
                    title: "Contractors",
                    description: "Verified home inspectors and repair specialists",
                  },
                  {
                    icon: Building2,
                    title: "Bankers",
                    description: "Mortgage lenders and financial advisors",
                  },
                ].map((stakeholder, idx) => (
                  <div
                    key={idx}
                    ref={(el) => {
                      cardsRef.current[12 + idx] = el;
                    }}
                    className="flex items-start space-x-4 ecosystem-item"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green flex items-center justify-center flex-shrink-0">
                      <stakeholder.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {stakeholder.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {stakeholder.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ecosystem Diagram */}
            <div className="relative ecosystem-diagram">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center z-10">
                    <span className="text-gray-900 font-bold">You</span>
                  </div>
                </div>
                {[
                  { label: "Buyers", top: "10%", left: "50%" },
                  { label: "Sellers", top: "50%", right: "10%" },
                  { label: "Lender", top: "90%", left: "50%" },
                  { label: "Contractor", top: "50%", left: "10%" },
                  { label: "Escrow", top: "20%", right: "20%" },
                ].map((node, idx) => (
                  <div
                    key={idx}
                    className="absolute w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs text-center p-2 shadow-md"
                    style={{
                      top: node.top,
                      left: node.left,
                      right: node.right,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {node.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={(el) => {
          sectionsRef.current[4] = el;
        }}
        className="py-20 lg:py-32 bg-green scroll-animate"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Start Your Home-Buying Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of first-time buyers who found their dream homes with an AI companion by their side.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-green rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
            >
              Sign Up
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>

          <p className="text-white/80 text-sm">
            No credit card required • Available 24/7 • Free to start
          </p>
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
                  <a href="#how-it-works" className="hover:text-white">
                    How It Works
                  </a>
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
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
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
