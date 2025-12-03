"use client";

import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import PropertyCard from "@/components/PropertyCard";
import { Search, Filter, Star, Heart, Tag, Plus } from "lucide-react";
import { mockProperties } from "@/lib/mockData";
import { Property } from "@/types";
import Link from "next/link";

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAgentData, setShowAgentData] = useState(true);
  const [sortBy, setSortBy] = useState<"price" | "match" | "recent">("recent");

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
          p.description?.toLowerCase().includes(query) ||
          p.agentNotes?.toLowerCase().includes(query)
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

    // Favorites filter
    if (showFavorites) {
      filtered = filtered.filter((p) => p.isFavorite);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "match":
          return b.matchScore - a.matchScore;
        case "recent":
          return (
            new Date(b.lastViewed || b.id).getTime() -
            new Date(a.lastViewed || a.id).getTime()
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, priceRange, propertyType, bedrooms, showFavorites, sortBy]);

  const propertyTypes = Array.from(
    new Set(mockProperties.map((p) => p.propertyType))
  );
  const bedroomOptions = Array.from(
    new Set(mockProperties.map((p) => p.bedrooms))
  ).sort();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Property Search
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Search and manage properties with custom notes and tags
            </p>
          </div>
          <Link
            href="/properties/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by address, city, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium ${
                  showFavorites
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    showFavorites ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                Favorites
              </button>
              <button
                onClick={() => setShowAgentData(!showAgentData)}
                className={`inline-flex items-center px-4 py-2 border rounded-lg text-sm font-medium ${
                  showAgentData
                    ? "bg-primary-50 border-primary-200 text-primary-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Tag className="h-4 w-4 mr-2" />
                Agent Data
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] || ""}
                  onChange={(e) =>
                    setPriceRange([
                      parseInt(e.target.value) || 0,
                      priceRange[1],
                    ])
                  }
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] || ""}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      parseInt(e.target.value) || 2000000,
                    ])
                  }
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              >
                <option value="all">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              >
                <option value="all">All</option>
                {bedroomOptions.map((beds) => (
                  <option key={beds} value={beds.toString()}>
                    {beds} {beds === 1 ? "Bed" : "Beds"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "price" | "match" | "recent")
                }
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              >
                <option value="recent">Most Recent</option>
                <option value="price">Price: Low to High</option>
                <option value="match">Match Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Found {filteredProperties.length} properties
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="block"
                >
                  <PropertyCard
                    property={property}
                    showMatchScore={true}
                    showAgentData={showAgentData}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No properties found
              </h3>
              <p className="text-sm text-gray-500">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}






