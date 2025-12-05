import Layout from "@/components/Layout";
import MetricCard from "@/components/MetricCard";
import ClientCard from "@/components/ClientCard";
import { Users, Search, FileText, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { mockClients, mockDashboardMetrics } from "@/lib/mockData";

export default function Dashboard() {
  const metrics = mockDashboardMetrics;
  const recentClients = mockClients.slice(0, 3);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Here&apos;s an overview of your work today.
            </p>
          </div>
          <Link
            href="/agents/clients/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Clients"
            value={metrics.activeClients}
            change={metrics.activeClientsChange}
            changeLabel="vs last month"
            icon={Users}
          />
          <MetricCard
            title="Pending Matches"
            value={metrics.pendingMatches}
            status="warning"
            icon={Search}
          />
          <MetricCard
            title="Monthly Recommendations"
            value={metrics.monthlyRecommendations}
            change={metrics.monthlyRecommendationsChange}
            changeLabel="vs last month"
            icon={FileText}
          />
          <MetricCard
            title="Match Success Rate"
            value={`${metrics.matchSuccessRate}%`}
            change={metrics.matchSuccessRateChange}
            changeLabel="vs last month"
            icon={TrendingUp}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Clients</h2>
            <Link
              href="/agents/clients"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentClients.length > 0 ? (
              recentClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No clients yet. Create your first client to get started.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/agents/clients/new"
                className="block w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Add New Client</div>
                <div className="text-sm text-gray-500">
                  Create a new client profile
                </div>
              </Link>
              <Link
                href="/agents/recommendations"
                className="block w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">Generate Report</div>
                <div className="text-sm text-gray-500">
                  Create property recommendations
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Insights
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    High match rate this month
                  </p>
                  <p className="text-sm text-gray-500">
                    Your recommendations are performing well with an 87% success
                    rate.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-orange-500 mt-2" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Action needed
                  </p>
                  <p className="text-sm text-gray-500">
                    {metrics.pendingMatches} clients need property matches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
