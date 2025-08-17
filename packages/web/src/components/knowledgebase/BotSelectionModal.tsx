import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Bot, Check } from "lucide-react";

export function BotSelectionModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Assign Knowledge to Bots
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Select which bots should have access to this knowledge source. You
            can change this later in the knowledge base settings.
          </p>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                <Checkbox
                  id={index.toString()}
                  checked={false}
                  onCheckedChange={() => {}}
                  className="mt-0.5"
                />
                <div className="flex-1 space-y-1">
                  <label
                    htmlFor={index.toString()}
                    className="text-sm font-medium text-slate-900 cursor-pointer"
                  >
                    Bot {index + 1}
                  </label>
                  <p className="text-xs text-slate-500">
                    Description {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {}}
            disabled={false}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Check className="w-4 h-4 mr-2" />
            Save Knowledge Source
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
