import { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { CreateBotDialog } from "../components/botsmanager/CreateBotDialog";
import { BotCard } from "@/components/botsmanager/BotCard";
import EmptyState from "@/components/botsmanager/EmptyState";
import { trpc } from "@/utils/trpc";

export function BotsManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { data: bots } = trpc.bot.getAll.useQuery();

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

      {bots?.length === 0 ? (
        <EmptyState handleCreateBot={() => setShowCreateDialog(true)} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[12px]">
          {bots?.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
      )}
    </div>
  );
}
