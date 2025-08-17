import { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { CreateBotDialog } from "../components/botsmanager/CreateBotDialog";
import { BotCard } from "@/components/botsmanager/BotCard";
import EmptyState from "@/components/botsmanager/EmptyState";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BotsManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="flex-1 overflow-auto p-6">
      <PageHeader
        title="Bot Management"
        description="Create, configure, and manage your RAG-powered chatbots"
        actions={
          <CreateBotDialog
            open={showCreateDialog}
            onOpenChange={setShowCreateDialog}
          />
        }
      />

      {/* <EmptyState /> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[12px]">
        <BotCard />
      </div>
    </div>
  );
}
