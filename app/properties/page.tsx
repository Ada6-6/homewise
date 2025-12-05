"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Home as HomeIcon,
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Heart,
  Bed,
  Bath,
  Square,
  DollarSign,
  ZoomIn,
  ZoomOut,
  AlertCircle,
} from "lucide-react";
import { mockProperties } from "@/lib/mockData";
import { Property } from "@/types";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function PropertiesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [useEmbedMap, setUseEmbedMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Default center (Austin, TX area)
  const defaultCenter = { lat: 30.2672, lng: -97.7431 };
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(12);

  // Get API key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load Google Maps API
  useEffect(() => {
    // If no API key, use embed map instead
    if (!apiKey || apiKey === "YOUR_API_KEY") {
      setUseEmbedMap(true);
      setMapLoaded(true);
      return;
    }

    if (!window.google && !document.querySelector('script[src*="maps.googleapis.com"]')) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      // Set up callback
      window.initMap = initializeMap;
      
      // Handle script load errors
      script.onerror = () => {
        setMapError("Failed to load Google Maps. Using alternative map view.");
        setUseEmbedMap(true);
        setMapLoaded(true);
      };
      
      document.head.appendChild(script);
    } else if (window.google && mapRef.current && !mapInstanceRef.current) {
      initializeMap();
    }

    return () => {
      if (markersRef.current.length > 0) {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
      }
    };
  }, [apiKey]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) {
      setMapError("Google Maps API not available. Using alternative map view.");
      setUseEmbedMap(true);
      setMapLoaded(true);
      return;
    }

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: mapZoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      // Add map event listeners
      map.addListener("center_changed", () => {
        const center = map.getCenter();
        if (center) {
          setMapCenter({ lat: center.lat(), lng: center.lng() });
        }
      });

      map.addListener("zoom_changed", () => {
        setMapZoom(map.getZoom());
      });

      setMapLoaded(true);
      setMapError(null);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Error loading map. Using alternative view.");
      setUseEmbedMap(true);
      setMapLoaded(true);
    }
  };

  // Update markers when filtered properties change
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google || useEmbedMap) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add markers for filtered properties
    filteredProperties.forEach((property) => {
      // Generate approximate coordinates (in real app, use geocoding)
      const lat = defaultCenter.lat + (Math.random() - 0.5) * 0.2;
      const lng = defaultCenter.lng + (Math.random() - 0.5) * 0.2;

      try {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstanceRef.current,
          title: property.address,
          icon: {
            url: selectedProperty?.id === property.id
              ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
              : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${property.address}</h3>
              <p style="margin: 0 0 4px 0; color: #059669; font-weight: bold; font-size: 16px;">$${(property.price / 1000).toFixed(0)}K</p>
              <p style="margin: 0; font-size: 12px; color: #666;">${property.bedrooms} bed • ${property.bathrooms} bath • ${property.squareFeet?.toLocaleString()} sqft</p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          setSelectedProperty(property);
          mapInstanceRef.current.setCenter({ lat, lng });
          mapInstanceRef.current.setZoom(15);
          infoWindow.open(mapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });
  }, [filteredProperties, selectedProperty, useEmbedMap]);

  const filteredProperties = useMemo(() => {
    let filtered = [...mockProperties];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.address.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          p.state.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Property type filter
    if (propertyType !== "all") {
      filtered = filtered.filter((p) => p.propertyType === propertyType);
    }

    // Bedrooms filter
    if (bedrooms !== "all") {
      const beds = parseInt(bedrooms);
      filtered = filtered.filter((p) => p.bedrooms === beds);
    }

    return filtered;
  }, [searchQuery, priceRange, propertyType, bedrooms]);

  const propertyTypes = Array.from(new Set(mockProperties.map((p) => p.propertyType)));
  const bedroomOptions = Array.from(new Set(mockProperties.map((p) => p.bedrooms))).sort();

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    // In a real app, you would geocode the address to get exact coordinates
    const lat = defaultCenter.lat + (Math.random() - 0.5) * 0.2;
    const lng = defaultCenter.lng + (Math.random() - 0.5) * 0.2;
    
    if (mapInstanceRef.current && !useEmbedMap) {
      mapInstanceRef.current.setCenter({ lat, lng });
      mapInstanceRef.current.setZoom(15);
    } else if (useEmbedMap) {
      setMapCenter({ lat, lng });
      setMapZoom(15);
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current && !useEmbedMap) {
      const currentZoom = mapInstanceRef.current.getZoom();
      mapInstanceRef.current.setZoom(currentZoom + 1);
    } else if (useEmbedMap) {
      setMapZoom((prev) => Math.min(prev + 1, 20));
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current && !useEmbedMap) {
      const currentZoom = mapInstanceRef.current.getZoom();
      mapInstanceRef.current.setZoom(currentZoom - 1);
    } else if (useEmbedMap) {
      setMapZoom((prev) => Math.max(prev - 1, 1));
    }
  };

  // Generate embed map URL
  const getEmbedMapUrl = () => {
    if (apiKey && apiKey !== "YOUR_API_KEY") {
      return `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${mapCenter.lat},${mapCenter.lng}&zoom=${mapZoom}`;
    }
    // Fallback to a static map or OpenStreetMap
    return `https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng - 0.1},${mapCenter.lat - 0.1},${mapCenter.lng + 0.1},${mapCenter.lat + 0.1}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`;
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
              <Link
                href="/properties"
                className="font-medium text-green hover:text-green-dark transition-colors"
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

      {/* Search and Filters Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-green-mint via-white to-green-mint/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Dream Home</h1>
            <p className="text-lg text-gray-600">Search thousands of properties with AI-powered matching</p>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city, address, or ZIP code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-green transition-colors"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </button>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green focus:border-green"
            >
              <option value="all">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green focus:border-green"
            >
              <option value="all">All Bedrooms</option>
              {bedroomOptions.map((beds) => (
                <option key={beds} value={beds.toString()}>
                  {beds} {beds === 1 ? "Bed" : "Beds"}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Price:</span>
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0] || ""}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                }
                className="w-24 px-2 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green focus:border-green"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1] || ""}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value) || 2000000])
                }
                className="w-24 px-2 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green focus:border-green"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Found {filteredProperties.length} propert{filteredProperties.length !== 1 ? "ies" : "y"}
          </div>
        </div>
      </section>

      {/* Main Content: Map and List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-300px)] min-h-[600px]">
            {/* Properties List */}
            <div className="overflow-y-auto space-y-4 pr-2">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => handlePropertyClick(property)}
                    className={`bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedProperty?.id === property.id
                        ? "border-green shadow-lg"
                        : "border-gray-200 hover:border-green hover:shadow-md"
                    }`}
                  >
                    <div className="flex">
                      <div className="w-48 h-48 flex-shrink-0 bg-gray-200 relative">
                        <img
                          src={property.imageUrl || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop"}
                          alt={property.address}
                          className="w-full h-full object-cover"
                        />
                        {property.isFavorite && (
                          <div className="absolute top-2 right-2">
                            <Heart className="h-5 w-5 text-red-500 fill-current" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {property.address}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {property.city}, {property.state}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green">
                              ${(property.price / 1000).toFixed(0)}K
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Square className="h-4 w-4" />
                            <span>{property.squareFeet?.toLocaleString()} sqft</span>
                          </div>
                        </div>
                        {property.description && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                            {property.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{property.propertyType}</span>
                          {property.matchScore && (
                            <span className="text-xs font-medium text-green">
                              {property.matchScore}% Match
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No properties found. Try adjusting your filters.</p>
                </div>
              )}
            </div>

            {/* Google Map */}
            <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
              
              {mapError && !useEmbedMap && (
                <div className="absolute top-4 left-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 z-20 max-w-xs">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Map API Key Required</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file for full map features.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {useEmbedMap ? (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "600px" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={getEmbedMapUrl()}
                />
              ) : (
                <div ref={mapRef} className="w-full h-full" style={{ minHeight: "600px" }} />
              )}
              
              {/* Map Controls Overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                <button
                  onClick={handleZoomIn}
                  className="bg-white px-3 py-2 rounded-lg shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center"
                  title="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="bg-white px-3 py-2 rounded-lg shadow-md hover:bg-gray-50 text-gray-700 font-bold flex items-center justify-center"
                  title="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
              </div>
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
