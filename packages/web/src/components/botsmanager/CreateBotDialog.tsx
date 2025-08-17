import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";
import { Plus, Globe, Send, Info } from "lucide-react";

export function CreateBotDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          <Plus className="w-4 h-4 mr-2" />
          Create Bot
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Bot</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="botName">Bot Name *</Label>
            <Input id="botName" placeholder="e.g., Customer Support Bot" />
          </div>
          <div>
            <Label htmlFor="botDescription">Description *</Label>
            <Textarea
              id="botDescription"
              placeholder="Brief description of your bot's purpose"
            />
          </div>
          <div>
            <Label htmlFor="channel">Publishing Channel *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Website Widget
                  </div>
                </SelectItem>
                <SelectItem value="telegram">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Telegram Bot
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              You can only choose one channel per bot. This cannot be changed
              later.
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Once created, you cannot change the
              publishing channel. Choose carefully based on where you want your
              bot to be available.
            </AlertDescription>
          </Alert>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">Create Bot</Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
