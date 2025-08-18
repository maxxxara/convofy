import { Plus } from "lucide-react";

import { BotIcon } from "lucide-react";
import { Button } from "../ui/button";

function EmptyState({ handleCreateBot }: { handleCreateBot: () => void }) {
  return (
    <div className="text-center py-12">
      <BotIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="font-medium mb-2">No bots found</h3>
      <p className="text-muted-foreground mb-4">
        Create your first bot to get started
      </p>
      <Button onClick={handleCreateBot}>
        <Plus className="w-4 h-4 mr-2" />
        Create Your First Bot
      </Button>
    </div>
  );
}

export default EmptyState;
