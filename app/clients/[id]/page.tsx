"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { mockClients, mockInteractions, mockProperties } from "@/lib/mockData";
import { createRecommendation } from "@/lib/generateRecommendation";
import { format } from "date-fns";
import {
  Mail,
  Phone,
  DollarSign,
  Home,
  MapPin,
  Calendar,
  FileText,
  PhoneCall,
  MessageSquare,
  User,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

const statusConfig = {
  pending: { label: "Pending Match", color: "bg-orange-100 text-orange-800" },
  recommended: { label: "Recommended", color: "bg-green-100 text-green-800" },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-800" },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-800" },
};

const interactionIcons = {
  call: PhoneCall,
  email: Mail,
  meeting: Calendar,
  note: FileText,
  recommendation_sent: FileText,
};

export default function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const client = mockClients.find((c) => c.id === params.id);
  const interactions = mockInteractions.filter(
    (i) => i.clientId === params.id
  );
  const recommendedProperties = mockProperties.slice(0, 3);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!client) {
    router.push("/clients");
    return null;
  }

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate AI matching logic
    setTimeout(() => {
      // Generate recommendation using AI matching algorithm
      const recommendation = createRecommendation(client);
      
      // In a real app, this would:
      // 1. Save the recommendation to the database via API
      // 2. Redirect to the recommendation page
      
      // For demo, we'll redirect to the recommendation page
      // In production, the recommendation would be saved first
      alert(
        `Recommendation report generated with ${recommendation.properties.length} properties! Redirecting...`
      );
      router.push(`/recommendations/${recommendation.id}`);
      setIsGenerating(false);
    }, 1500);
  };

  const status = statusConfig[client.status];
  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Layout>
      <div className="space-y-6">
        <Link
          href="/clients"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-bold text-xl">
                  {initials}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {client.name}
                </h1>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {client.phone}
                  </div>
                </div>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
            >
              {status.label}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Budget Range
              </h3>
              <div className="flex items-center text-lg font-semibold text-gray-900">
                <DollarSign className="h-5 w-5 mr-1" />
                ${(client.budgetRange.min / 1000).toFixed(0)}K - $
                {(client.budgetRange.max / 1000).toFixed(0)}K
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Created Date
              </h3>
              <div className="flex items-center text-lg font-semibold text-gray-900">
                <Calendar className="h-5 w-5 mr-2" />
                {format(new Date(client.createdAt), "MMMM d, yyyy")}
              </div>
            </div>
            {client.preferences.location && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Preferred Location
                </h3>
                <div className="flex items-center text-lg font-semibold text-gray-900">
                  <MapPin className="h-5 w-5 mr-2" />
                  {client.preferences.location}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Property Preferences
              </h3>
              <div className="flex items-center text-lg font-semibold text-gray-900">
                <Home className="h-5 w-5 mr-2" />
                {client.preferences.bedrooms} bed, {client.preferences.bathrooms}{" "}
                bath • {client.preferences.propertyType}
              </div>
            </div>
          </div>

          {client.notes && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <p className="text-sm text-gray-900">{client.notes}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Interaction History
              </h2>
              {interactions.length > 0 ? (
                <div className="space-y-4">
                  {interactions.map((interaction) => {
                    const Icon =
                      interactionIcons[
                        interaction.type as keyof typeof interactionIcons
                      ] || FileText;
                    return (
                      <div
                        key={interaction.id}
                        className="flex items-start space-x-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                      >
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {interaction.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(
                                new Date(interaction.createdAt),
                                "MMM d, yyyy"
                              )}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {interaction.description}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            By {interaction.createdBy}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">
                    No interactions yet. Start engaging with this client.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recommended Properties
                </h2>
                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate Report"}
                </button>
              </div>
              {recommendedProperties.length > 0 ? (
                <div className="space-y-4">
                  {recommendedProperties.map((property) => (
                    <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative h-32 bg-gray-200">
                        {property.imageUrl ? (
                          <img
                            src={property.imageUrl}
                            alt={property.address}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {property.address}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {property.city}, {property.state}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-bold text-primary-600">
                            ${(property.price / 1000).toFixed(0)}K
                          </span>
                          <span className="text-xs font-medium text-green-600">
                            {property.matchScore}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">
                    No recommendations yet. Generate a report to see matches.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

