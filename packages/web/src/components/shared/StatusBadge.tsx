import { Badge } from "../ui/badge";
import type { LucideIcon } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  statusConfig?: Record<
    string,
    {
      variant: "default" | "secondary" | "destructive" | "outline";
      icon?: LucideIcon;
      label?: string;
    }
  >;
}

export function StatusBadge({ status, statusConfig }: StatusBadgeProps) {
  const defaultConfig = {
    active: { variant: "default" as const, label: "Active", icon: undefined },
    draft: { variant: "secondary" as const, label: "Draft", icon: undefined },
    inactive: {
      variant: "outline" as const,
      label: "Inactive",
      icon: undefined,
    },
    pending: { variant: "outline" as const, label: "Pending", icon: undefined },
    resolved: {
      variant: "default" as const,
      label: "Resolved",
      icon: undefined,
    },
    escalated: {
      variant: "destructive" as const,
      label: "Escalated",
      icon: undefined,
    },
    unresolved: {
      variant: "outline" as const,
      label: "Unresolved",
      icon: undefined,
    },
    processed: {
      variant: "default" as const,
      label: "Processed",
      icon: undefined,
    },
    processing: {
      variant: "secondary" as const,
      label: "Processing",
      icon: undefined,
    },
    failed: {
      variant: "destructive" as const,
      label: "Failed",
      icon: undefined,
    },
  };

  const config = statusConfig || defaultConfig;
  const statusInfo = config[status as keyof typeof config] || {
    variant: "outline" as const,
    label: status,
    icon: undefined,
  };
  const Icon = statusInfo.icon;

  return (
    <Badge
      variant={statusInfo.variant}
      className="text-xs flex items-center gap-1"
    >
      {Icon && <Icon className="w-3 h-3" />}
      {statusInfo.label || status}
    </Badge>
  );
}
