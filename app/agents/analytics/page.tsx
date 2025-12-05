"use client";

import Layout from "@/components/Layout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { mockDashboardMetrics, mockClients, mockProperties } from "@/lib/mockData";
import MetricCard from "@/components/MetricCard";
import { TrendingUp, DollarSign, Home, Users } from "lucide-react";

const monthlyData = [
  { month: "Jan", clients: 18, recommendations: 120 },
  { month: "Feb", clients: 20, recommendations: 135 },
  { month: "Mar", clients: 22, recommendations: 142 },
  { month: "Apr", clients: 21, recommendations: 138 },
  { month: "May", clients: 23, recommendations: 145 },
  { month: "Jun", clients: 24, recommendations: 156 },
];

const statusData = [
  { name: "Pending", value: mockClients.filter((c) => c.status === "pending").length },
  {
    name: "Recommended",
    value: mockClients.filter((c) => c.status === "recommended").length,
  },
  {
    name: "In Progress",
    value: mockClients.filter((c) => c.status === "in_progress").length,
  },
  { name: "Closed", value: mockClients.filter((c) => c.status === "closed").length },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6b7280"];

const propertyTypeData = mockProperties.reduce((acc, prop) => {
  acc[prop.propertyType] = (acc[prop.propertyType] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const propertyTypeChartData = Object.entries(propertyTypeData).map(([name, value]) => ({
  name,
  value,
}));

const priceRangeData = [
  { range: "$400K-$600K", count: mockProperties.filter(p => p.price >= 400000 && p.price < 600000).length },
  { range: "$600K-$800K", count: mockProperties.filter(p => p.price >= 600000 && p.price < 800000).length },
  { range: "$800K-$1M", count: mockProperties.filter(p => p.price >= 800000 && p.price < 1000000).length },
  { range: "$1M+", count: mockProperties.filter(p => p.price >= 1000000).length },
];

const avgPriceByCity = mockProperties.reduce((acc, prop) => {
  if (!acc[prop.city]) {
    acc[prop.city] = { total: 0, count: 0 };
  }
  acc[prop.city].total += prop.price;
  acc[prop.city].count += 1;
  return acc;
}, {} as Record<string, { total: number; count: number }>);

const cityPriceData = Object.entries(avgPriceByCity).map(([city, data]) => ({
  city,
  avgPrice: Math.round(data.total / data.count / 1000),
}));

export default function AnalyticsPage() {
  const metrics = mockDashboardMetrics;
  const avgMatchScore = Math.round(
    mockProperties.reduce((sum, p) => sum + p.matchScore, 0) / mockProperties.length
  );
  const totalPropertyValue = mockProperties.reduce((sum, p) => sum + p.price, 0);
  const avgPropertyPrice = Math.round(totalPropertyValue / mockProperties.length / 1000);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Performance metrics and insights for your real estate business
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Clients"
            value={mockClients.length}
            icon={Users}
          />
          <MetricCard
            title="Total Properties"
            value={mockProperties.length}
            icon={Home}
          />
          <MetricCard
            title="Avg. Match Score"
            value={`${avgMatchScore}%`}
            icon={TrendingUp}
          />
          <MetricCard
            title="Avg. Property Price"
            value={`$${avgPropertyPrice}K`}
            icon={DollarSign}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Response Rate</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">78%</p>
            <p className="mt-1 text-xs text-green-600">↑ 5% vs last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">34%</p>
            <p className="mt-1 text-xs text-green-600">↑ 3% vs last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Favorite Properties</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {mockProperties.filter(p => p.isFavorite).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-600">Total Property Value</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${(totalPropertyValue / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Monthly Trends
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="clients"
                  stroke="#3b82f6"
                  name="Active Clients"
                />
                <Line
                  type="monotone"
                  dataKey="recommendations"
                  stroke="#10b981"
                  name="Recommendations"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Client Status Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recommendations Performance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="recommendations" fill="#10b981" name="Recommendations" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Property Type Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypeChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {propertyTypeChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Price Range Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceRangeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" name="Properties" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Average Price by City
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityPriceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}K`} />
                <Bar dataKey="avgPrice" fill="#f59e0b" name="Avg Price (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="recommendations"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                name="Recommendations"
              />
              <Area
                type="monotone"
                dataKey="clients"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                name="Active Clients"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}

