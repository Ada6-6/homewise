"use client";

import { useState } from "react";
import { Property } from "@/types";
import { Home, Star, Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  showMatchScore?: boolean;
  showAgentData?: boolean;
}

export default function PropertyCard({
  property,
  showMatchScore = true,
  showAgentData = false,
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);
  // Better default image with gradient
  const defaultImageUrl = `https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop&q=80`;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow relative">
      {property.isFavorite && (
        <div className="absolute top-2 right-2 z-10">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
        </div>
      )}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
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
              <Home className="h-12 w-12 text-primary-400 mx-auto mb-2" />
              <p className="text-xs text-primary-600 font-medium">Property Image</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {property.address}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {property.city}, {property.state}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{property.bedrooms} bed</span>
            <span>{property.bathrooms} bath</span>
            {property.squareFeet && (
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            )}
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary-600">
              ${(property.price / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
        {showMatchScore && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Match Score
              </span>
              <span className="text-sm font-semibold text-green-600">
                {property.matchScore}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${property.matchScore}%` }}
              />
            </div>
          </div>
        )}
        {property.description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {property.description}
          </p>
        )}
        {showAgentData && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            {property.agentRating && (
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < property.agentRating!
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-xs text-gray-600">
                  Agent Rating
                </span>
              </div>
            )}
            {property.agentTags && property.agentTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {property.agentTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-primary-50 text-primary-700 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {property.agentNotes && (
              <p className="mt-2 text-xs text-gray-600 line-clamp-2 italic">
                {property.agentNotes}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

