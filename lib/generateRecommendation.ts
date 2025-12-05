import { Client, Property, Recommendation } from "@/types";
import { mockProperties } from "./mockData";

/**
 * AI-powered property matching algorithm
 * Matches properties based on client preferences, budget, and location
 */
export function generateRecommendation(
  client: Client,
  allProperties: Property[] = mockProperties
): Property[] {
  const matches: Array<{ property: Property; score: number }> = [];

  for (const property of allProperties) {
    let score = 0;
    let maxScore = 0;

    // Budget match (40% weight)
    maxScore += 40;
    if (
      property.price >= client.budgetRange.min &&
      property.price <= client.budgetRange.max
    ) {
      // Perfect match
      score += 40;
    } else if (
      property.price < client.budgetRange.min * 1.1 &&
      property.price > client.budgetRange.min * 0.9
    ) {
      // Close to min budget
      score += 30;
    } else if (
      property.price > client.budgetRange.max * 0.9 &&
      property.price < client.budgetRange.max * 1.1
    ) {
      // Close to max budget
      score += 30;
    } else {
      // Too far from budget
      const distance = Math.min(
        Math.abs(property.price - client.budgetRange.min),
        Math.abs(property.price - client.budgetRange.max)
      );
      const budgetRange = client.budgetRange.max - client.budgetRange.min;
      score += Math.max(0, 20 - (distance / budgetRange) * 20);
    }

    // Bedrooms match (20% weight)
    maxScore += 20;
    if (client.preferences.bedrooms) {
      if (property.bedrooms === client.preferences.bedrooms) {
        score += 20;
      } else if (Math.abs(property.bedrooms - client.preferences.bedrooms) === 1) {
        score += 15;
      } else {
        score += Math.max(0, 10 - Math.abs(property.bedrooms - client.preferences.bedrooms) * 5);
      }
    } else {
      score += 10; // No preference, give partial credit
    }

    // Bathrooms match (15% weight)
    maxScore += 15;
    if (client.preferences.bathrooms) {
      const diff = Math.abs(property.bathrooms - client.preferences.bathrooms);
      if (diff === 0) {
        score += 15;
      } else if (diff <= 0.5) {
        score += 12;
      } else if (diff <= 1) {
        score += 8;
      } else {
        score += Math.max(0, 5 - diff * 2);
      }
    } else {
      score += 7;
    }

    // Location match (15% weight)
    maxScore += 15;
    if (client.preferences.location) {
      if (
        property.city.toLowerCase() ===
        client.preferences.location.toLowerCase()
      ) {
        score += 15;
      } else if (
        property.city
          .toLowerCase()
          .includes(client.preferences.location.toLowerCase()) ||
        client.preferences.location
          .toLowerCase()
          .includes(property.city.toLowerCase())
      ) {
        score += 10;
      } else {
        score += 5; // Same state
      }
    } else {
      score += 7;
    }

    // Property type match (10% weight)
    maxScore += 10;
    if (client.preferences.propertyType) {
      if (property.propertyType === client.preferences.propertyType) {
        score += 10;
      } else {
        score += 3; // Partial match
      }
    } else {
      score += 5;
    }

    // Calculate final match score as percentage
    const finalScore = Math.round((score / maxScore) * 100);

    if (finalScore >= 70) {
      // Only include properties with at least 70% match
      matches.push({
        property: { ...property, matchScore: finalScore },
        score: finalScore,
      });
    }
  }

  // Sort by score (highest first) and return top matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Top 10 matches
    .map((m) => m.property);
}

/**
 * Create a new recommendation report for a client
 */
export function createRecommendation(
  client: Client,
  selectedProperties?: Property[]
): Recommendation {
  const properties =
    selectedProperties || generateRecommendation(client, mockProperties);

  return {
    id: `r${Date.now()}`,
    clientId: client.id,
    clientName: client.name,
    properties: properties.slice(0, 5), // Limit to top 5 for the report
    createdAt: new Date().toISOString().split("T")[0],
    status: "draft",
  };
}













