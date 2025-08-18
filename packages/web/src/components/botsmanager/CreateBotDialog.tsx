import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import {
  Plus,
  Globe,
  Send,
  Info,
  Bot,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";

export function CreateBotDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    channel: "",
  });
  const [selectedChannel, setSelectedChannel] = useState<
    "TELEGRAM" | "WEB_WIDGET"
  >("WEB_WIDGET");

  const { mutateAsync: createBot } = trpc.bot.create.useMutation();
  const trpcUtils = trpc.useUtils();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBot({
      name: formData.name,
      description: formData.description,
      channel: selectedChannel,
    });
    trpcUtils.bot.getAll.invalidate();
    toast.success("Bot created successfully");
    onOpenChange(false);
  };

  const isFormValid = formData.name && formData.description && selectedChannel;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Bot
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Create New Bot</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Build an AI-powered chatbot for your business needs
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bot Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-medium">Bot Details</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="botName" className="text-sm font-medium">
                Bot Name *
              </Label>
              <Input
                id="botName"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Customer Support Bot"
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Choose a descriptive name for your bot
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="botDescription" className="text-sm font-medium">
                Description *
              </Label>
              <Textarea
                id="botDescription"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe what your bot will help users with..."
                className="min-h-[80px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                This helps us configure your bot's behavior and responses
              </p>
            </div>
          </div>

          {/* Channel Selection Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="w-4 h-4 text-primary" />
              <h3 className="font-medium">Publishing Channel *</h3>
            </div>

            <div className="grid gap-3">
              <Card
                key={"WEB_WIDGET"}
                className={`cursor-pointer py-0 transition-all duration-200 hover:shadow-md ${
                  selectedChannel === "WEB_WIDGET"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/30"
                }`}
                onClick={() => setSelectedChannel("WEB_WIDGET")}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedChannel === "WEB_WIDGET"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">Website Widget</h4>
                          <Badge
                            variant="secondary"
                            className="text-xs bg-primary/10 text-primary"
                          >
                            Most Popular
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Embed a chat widget on your website
                        </p>
                      </div>
                    </div>
                    {selectedChannel === "WEB_WIDGET" && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card
                key={"TELEGRAM"}
                className={`cursor-pointer py-0 transition-all duration-200 hover:shadow-md ${
                  selectedChannel === "TELEGRAM"
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/30"
                }`}
                onClick={() => setSelectedChannel("TELEGRAM")}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedChannel === "TELEGRAM"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Send className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">Telegram</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Connect your bot to Telegram
                        </p>
                      </div>
                    </div>
                    {selectedChannel === "TELEGRAM" && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 shrink-0" />
              You can only choose one channel per bot.
            </p>
          </div>

          {/* Footer Actions */}
          <DialogFooter className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
            >
              <Bot className="w-4 h-4 mr-2" />
              Create Bot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
