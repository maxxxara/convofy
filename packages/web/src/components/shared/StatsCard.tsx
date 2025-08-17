import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative";
  icon?: LucideIcon;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "positive",
  icon: Icon,
  iconColor = "text-primary",
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="mt-1">{value}</h3>
            {change && (
              <Badge
                variant={changeType === "positive" ? "default" : "destructive"}
                className="mt-2 text-xs"
              >
                {change}
              </Badge>
            )}
          </div>
          {Icon && (
            <div className={`p-3 rounded-lg bg-muted ${iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
