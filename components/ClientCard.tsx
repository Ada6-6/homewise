import Link from "next/link";
import { Client } from "@/types";
import { format } from "date-fns";

interface ClientCardProps {
  client: Client;
}

const statusConfig = {
  pending: { label: "Pending Match", color: "bg-orange-100 text-orange-800" },
  recommended: { label: "Recommended", color: "bg-green-100 text-green-800" },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-800" },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-800" },
};

export default function ClientCard({ client }: ClientCardProps) {
  const status = statusConfig[client.status];
  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      href={`/clients/${client.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary-600 font-semibold">{initials}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {client.name}
          </p>
          <p className="text-sm text-gray-500">
            ${(client.budgetRange.min / 1000).toFixed(0)}K - $
            {(client.budgetRange.max / 1000).toFixed(0)}K
          </p>
        </div>
        <div className="flex-shrink-0">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
          >
            {status.label}
          </span>
        </div>
        <div className="flex-shrink-0 text-sm text-gray-500">
          {format(new Date(client.createdAt), "MMM d, yyyy")}
        </div>
      </div>
    </Link>
  );
}



