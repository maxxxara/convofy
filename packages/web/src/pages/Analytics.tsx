import { PageHeader } from "@/components/shared/PageHeader";
import { BarChart3 } from "lucide-react";

export function Analytics() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <PageHeader
        title="Analytics & Insights"
        description="Monitor performance and gain insights from your chatbot interactions"
      />

      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium mb-2">Coming Soon</h3>
        <p className="text-muted-foreground">
          Advanced analytics and insights features are coming soon
        </p>
      </div>
    </div>
  );
}
