export type ClientStatus = "pending" | "recommended" | "in_progress" | "closed";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  budgetRange: {
    min: number;
    max: number;
  };
  status: ClientStatus;
  createdAt: string;
  preferences: {
    bedrooms?: number;
    bathrooms?: number;
    location?: string;
    propertyType?: string;
  };
  notes?: string;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  imageUrl: string;
  matchScore: number;
  propertyType: string;
  yearBuilt?: number;
  description?: string;
  // Agent custom data
  agentNotes?: string;
  agentTags?: string[];
  agentRating?: number; // 1-5 rating
  agentCustomFields?: Record<string, string>;
  isFavorite?: boolean;
  lastViewed?: string;
  viewCount?: number;
}

export interface Recommendation {
  id: string;
  clientId: string;
  clientName: string;
  properties: Property[];
  createdAt: string;
  status: "draft" | "sent" | "viewed";
}

export interface Interaction {
  id: string;
  clientId: string;
  type: "call" | "email" | "meeting" | "note" | "recommendation_sent";
  title: string;
  description: string;
  createdAt: string;
  createdBy: string;
}

export interface DashboardMetrics {
  activeClients: number;
  activeClientsChange: number;
  pendingMatches: number;
  monthlyRecommendations: number;
  monthlyRecommendationsChange: number;
  matchSuccessRate: number;
  matchSuccessRateChange: number;
}

export interface AgentSettings {
  name: string;
  email: string;
  phone: string;
  company?: string;
  licenseNumber?: string;
  notificationPreferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    newClientAlerts: boolean;
    recommendationAlerts: boolean;
  };
  displayPreferences: {
    currency: string;
    dateFormat: string;
    timezone: string;
  };
}

