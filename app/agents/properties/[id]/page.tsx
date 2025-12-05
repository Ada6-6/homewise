"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { mockProperties } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Heart,
  Tag,
  Edit,
  MapPin,
  Home,
  DollarSign,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const property = mockProperties.find((p) => p.id === params.id);
  const [isFavorite, setIsFavorite] = useState(property?.isFavorite || false);
  const [agentNotes, setAgentNotes] = useState(property?.agentNotes || "");
  const [agentRating, setAgentRating] = useState(property?.agentRating || 0);
  const [agentTags, setAgentTags] = useState<string[]>(
    property?.agentTags || []
  );
  const [newTag, setNewTag] = useState("");

  if (!property) {
    router.push("/properties");
    return null;
  }

  const handleAddTag = () => {
    if (newTag.trim() && !agentTags.includes(newTag.trim())) {
      setAgentTags([...agentTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setAgentTags(agentTags.filter((t) => t !== tag));
  };

  const handleRatingClick = (rating: number) => {
    setAgentRating(rating === agentRating ? 0 : rating);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Link
          href="/agents/properties"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Link>

        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200">
            {property.imageUrl && !imageError ? (
              <img
                src={property.imageUrl}
                alt={property.address}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="text-center">
                  <Home className="h-24 w-24 text-primary-400 mx-auto mb-2" />
                  <p className="text-sm text-primary-600 font-medium">Property Image</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.address}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  {property.city}, {property.state}
                </div>
                <div className="text-4xl font-bold text-primary-600">
                  ${(property.price / 1000).toFixed(0)}K
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-lg border ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`h-6 w-6 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="text-lg font-semibold text-gray-900">
                  {property.bedrooms}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="text-lg font-semibold text-gray-900">
                  {property.bathrooms}
                </p>
              </div>
              {property.squareFeet && (
                <div>
                  <p className="text-sm text-gray-500">Square Feet</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {property.squareFeet.toLocaleString()}
                  </p>
                </div>
              )}
              {property.yearBuilt && (
                <div>
                  <p className="text-sm text-gray-500">Year Built</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {property.yearBuilt}
                  </p>
                </div>
              )}
            </div>

            {property.description && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{property.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Notes and Custom Data */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Agent Notes
                </h2>
                <button className="text-primary-600 hover:text-primary-700">
                  <Edit className="h-5 w-5" />
                </button>
              </div>
              <textarea
                value={agentNotes}
                onChange={(e) => setAgentNotes(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Add your notes about this property..."
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Agent Rating
              </h2>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        rating <= agentRating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                {agentRating > 0 && (
                  <span className="ml-2 text-sm text-gray-600">
                    {agentRating} / 5
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {agentTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-primary-500 hover:text-primary-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Property Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Property Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Property Type</span>
                  <span className="text-sm font-medium text-gray-900">
                    {property.propertyType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <span className="text-sm font-medium text-green-600">
                    {property.matchScore}%
                  </span>
                </div>
                {property.viewCount && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Views</span>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {property.viewCount}
                      </span>
                    </div>
                  </div>
                )}
                {property.lastViewed && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Viewed</span>
                    <span className="text-sm font-medium text-gray-900">
                      {format(new Date(property.lastViewed), "MMM d, yyyy")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Share with Client
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Schedule Viewing
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Add to Recommendation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

