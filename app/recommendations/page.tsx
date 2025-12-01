"use client";

import Layout from "@/components/Layout";
import PropertyCard from "@/components/PropertyCard";
import { Download } from "lucide-react";
import { mockRecommendations, mockProperties } from "@/lib/mockData";
import Link from "next/link";

export default function RecommendationsPage() {
  const recommendations = mockRecommendations;
  const allProperties = mockProperties;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Recommendation Reports
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              AI-powered property recommendations for your clients
            </p>
          </div>
        </div>

        {recommendations.length > 0 ? (
          <div className="space-y-8">
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {recommendation.clientName} - Property Recommendations
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Based on AI intelligent matching, we recommend the most
                      suitable properties for you.
                    </p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Link
                    href={`/recommendations/${recommendation.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View & Edit Report →
                  </Link>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-500">
                    {recommendation.properties.length} properties
                  </span>
                  <span className="text-gray-400">|</span>
                  <span
                    className={`text-sm ${
                      recommendation.status === "sent"
                        ? "text-green-600"
                        : recommendation.status === "viewed"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {recommendation.status.charAt(0).toUpperCase() +
                      recommendation.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendation.properties.map((property) => (
                    <Link
                      key={property.id}
                      href={`/properties/${property.id}`}
                      className="block"
                    >
                      <PropertyCard
                        property={property}
                        showMatchScore={true}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No recommendations yet
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Generate property recommendations for your clients to get
                started.
              </p>
              <Link
                href="/clients"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                View Clients
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

