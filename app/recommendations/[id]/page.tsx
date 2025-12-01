"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PropertyCard from "@/components/PropertyCard";
import { mockRecommendations, mockProperties, mockClients } from "@/lib/mockData";
import { createRecommendation } from "@/lib/generateRecommendation";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Mail,
  Plus,
  Trash2,
  Save,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default function RecommendationDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const router = useRouter();
  const urlParams = useParams();
  const id = typeof params === "object" && "id" in params ? params.id : urlParams?.id as string;
  
  const [recommendation, setRecommendation] = useState(
    id ? mockRecommendations.find((r) => r.id === id) : undefined
  );
  const [client, setClient] = useState<typeof mockClients[0] | null>(
    recommendation
      ? mockClients.find((c) => c.id === recommendation.clientId) || null
      : null
  );

  const [selectedProperties, setSelectedProperties] = useState<string[]>(
    recommendation?.properties.map((p) => p.id) || []
  );
  const [showAddProperties, setShowAddProperties] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // If recommendation doesn't exist, try to generate it from client
  useEffect(() => {
    if (!recommendation && id && id.startsWith("r")) {
      // Try to find client by extracting from a new recommendation
      // In a real app, this would fetch from the database
      const allClients = mockClients;
      if (allClients.length > 0) {
        // For demo, use first client
        const demoClient = allClients[0];
        const newRec = createRecommendation(demoClient);
        setRecommendation(newRec);
        setClient(demoClient);
        setSelectedProperties(newRec.properties.map((p) => p.id));
      }
    }
  }, [id, recommendation]);

  // Update client when recommendation changes
  useEffect(() => {
    if (recommendation && !client && recommendation.clientId) {
      const foundClient = mockClients.find((c) => c.id === recommendation.clientId);
      if (foundClient) {
        setClient(foundClient);
      }
    }
  }, [recommendation, client]);

  if (!recommendation || !client) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Loading recommendation...</p>
            <button
              onClick={() => router.push("/recommendations")}
              className="text-primary-600 hover:text-primary-700"
            >
              Back to Recommendations
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentProperties = mockProperties.filter((p) =>
    selectedProperties.includes(p.id)
  );

  const availableProperties = mockProperties.filter(
    (p) =>
      !selectedProperties.includes(p.id) &&
      (p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddProperty = (propertyId: string) => {
    if (!selectedProperties.includes(propertyId)) {
      setSelectedProperties([...selectedProperties, propertyId]);
    }
  };

  const handleRemoveProperty = (propertyId: string) => {
    setSelectedProperties(selectedProperties.filter((id) => id !== propertyId));
  };

  const handleExportPDF = () => {
    if (!client) return;
    
    // Generate PDF content
    const pdfContent = `
      Property Recommendation Report
      ==============================
      
      Client: ${client.name}
      Email: ${client.email}
      Date: ${format(new Date(), "MMMM d, yyyy")}
      
      Properties Recommended:
      ${currentProperties
        .map(
          (p, i) => `
      ${i + 1}. ${p.address}
         ${p.city}, ${p.state}
         Price: $${p.price.toLocaleString()}
         ${p.bedrooms} bed, ${p.bathrooms} bath
         Match Score: ${p.matchScore}%
      `
        )
        .join("")}
    `;

    // Create a blob and download
    const blob = new Blob([pdfContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Recommendation_${client.name.replace(/\s+/g, "_")}_${format(
      new Date(),
      "yyyy-MM-dd"
    )}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // In production, use a proper PDF library like jsPDF or react-pdf
    alert(
      "PDF export initiated! (In production, this would generate a proper PDF file)"
    );
  };

  const handleSendEmail = () => {
    if (!client) return;
    
    const emailSubject = `Property Recommendations for ${client.name}`;
    const emailBody = `
Dear ${client.name},

Based on your preferences and budget, I've prepared a personalized property recommendation report for you.

Budget Range: $${client.budgetRange.min.toLocaleString()} - $${client.budgetRange.max.toLocaleString()}
Preferences: ${client.preferences.bedrooms || "Any"} bedrooms, ${client.preferences.bathrooms || "Any"} bathrooms
Location: ${client.preferences.location || "Flexible"}

Recommended Properties:
${currentProperties
  .map(
    (p, i) => `
${i + 1}. ${p.address}, ${p.city}, ${p.state}
   Price: $${p.price.toLocaleString()}
   ${p.bedrooms} bed, ${p.bathrooms} bath
   Match Score: ${p.matchScore}%
`
  )
  .join("")}

Please let me know if you'd like to schedule viewings for any of these properties.

Best regards,
Your Real Estate Agent
    `;

    // Create mailto link
    const mailtoLink = `mailto:${client.email}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    // In production, this would call an API to send the email
    alert(
      "Opening email client... (In production, this would send via API)"
    );
  };

  const handleSave = () => {
    // In a real app, this would save the changes
    alert("Report saved successfully!");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Link
          href="/recommendations"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Recommendations
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {recommendation?.clientName || "Property Recommendations"} - Property Recommendations
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Based on AI intelligent matching, we recommend the most suitable
                properties for you.
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <span>
                  Client:{" "}
                  {client ? (
                    <Link
                      href={`/clients/${client.id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {client.name}
                    </Link>
                  ) : (
                    "Loading..."
                  )}
                </span>
                <span>•</span>
                <span>
                  Created: {recommendation ? format(new Date(recommendation.createdAt), "MMM d, yyyy") : "N/A"}
                </span>
                <span>•</span>
                <span
                  className={`${
                    recommendation?.status === "sent"
                      ? "text-green-600"
                      : recommendation?.status === "viewed"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  Status:{" "}
                  {recommendation?.status
                    ? recommendation.status.charAt(0).toUpperCase() +
                      recommendation.status.slice(1)
                    : "Draft"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPDF}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </button>
              <button
                onClick={handleSendEmail}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowAddProperties(!showAddProperties)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Properties
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Add Properties Panel */}
        {showAddProperties && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Properties to Report
              </h2>
              <button
                onClick={() => setShowAddProperties(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search properties by address or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {availableProperties.length > 0 ? (
                availableProperties.map((property) => (
                  <div
                    key={property.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors relative"
                  >
                    <button
                      onClick={() => handleAddProperty(property.id)}
                      className="absolute top-2 right-2 p-1 text-primary-600 hover:text-primary-700"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                    <div className="pr-8">
                      <h3 className="font-semibold text-gray-900">
                        {property.address}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {property.city}, {property.state}
                      </p>
                      <p className="text-lg font-bold text-primary-600 mt-2">
                        ${(property.price / 1000).toFixed(0)}K
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {property.bedrooms} bed • {property.bathrooms} bath
                      </p>
                      <div className="mt-2">
                        <span className="text-xs font-medium text-green-600">
                          Match: {property.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  No properties found. Try adjusting your search.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Current Properties */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recommended Properties ({currentProperties.length})
            </h2>
          </div>

          {currentProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProperties.map((property) => (
                <div key={property.id} className="relative">
                  <Link
                    href={`/properties/${property.id}`}
                    className="block"
                  >
                    <PropertyCard
                      property={property}
                      showMatchScore={true}
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveProperty(property.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                    title="Remove from report"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500 mb-4">
                No properties in this report yet.
              </p>
              <button
                onClick={() => setShowAddProperties(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Properties
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

