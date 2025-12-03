import { LucideIcon, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  status?: "success" | "warning" | "info";
}

export default function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  status = "success",
}: MetricCardProps) {
  const statusColors = {
    success: "text-green-600",
    warning: "text-orange-600",
    info: "text-blue-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="mt-2 flex items-center">
              <TrendingUp className={`h-4 w-4 ${statusColors[status]} mr-1`} />
              <span className={`text-sm font-medium ${statusColors[status]}`}>
                ↑ {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="ml-1 text-sm text-gray-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={`${statusColors[status]} opacity-20`}>
          <Icon className="h-12 w-12" />
        </div>
      </div>
    </div>
  );
}






