import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Send,
  ExternalLink,
  CheckCircle,
  Copy,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";

function PublishTelegram() {
  const [telegramToken, setTelegramToken] = useState("");

  const { botId } = useParams();
  const trpcUtils = trpc.useUtils();
  const navigate = useNavigate();
  if (!botId) {
    navigate("/bots");
  }
  const { data: botPublication } = trpc.bot.getPublication.useQuery({
    botId: botId!,
  });

  const { mutateAsync: updatePublication } =
    trpc.bot.updatePublication.useMutation();

  useEffect(() => {
    if (botPublication) {
      setTelegramToken(botPublication.telegramToken || "");
    }
  }, [botPublication]);

  const handleTelegramTokenSubmit = async () => {
    if (!botPublication) return;
    if (!telegramToken.trim()) return;
    await updatePublication({
      botPublicationId: botPublication.id,
      scriptConfig: botPublication.scriptConfig || {},
      status: "DRAFT",
      telegramToken: telegramToken,
    });
    await trpcUtils.bot.getPublication.invalidate({ botId: botId! });
    toast.success("Bot token updated successfully");
  };

  return (
    <div className="space-y-6">
      {/* Token Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Bot Token Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="telegramToken">Telegram Bot Token</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="telegramToken"
                type="password"
                placeholder="1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
                className="flex-1 mt-0"
              />
              <Button onClick={handleTelegramTokenSubmit}>
                <CheckCircle className="w-4 h-4" />
                Connect
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Paste the token you received from BotFather
            </p>
          </div>

          {false && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                ❌ Invalid token. Please check your token and try again.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Telegram Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Telegram Bot Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Step-by-step instructions:</h4>
            <ol className="space-y-3 text-sm">
              {[
                {
                  step: "1",
                  title: "Open Telegram and search for @BotFather",
                  description:
                    "BotFather is the official bot for creating Telegram bots",
                },
                {
                  step: "2",
                  title: "Start a chat and send /newbot",
                  description: "This command creates a new bot",
                },
                {
                  step: "3",
                  title: "Choose a name for your bot",
                  description: `Example: "Customer Support Bot"`,
                },
                {
                  step: "4",
                  title: 'Choose a username ending with "bot"',
                  description:
                    'Example: "customer_support_bot" or "help_desk_bot"',
                },
                {
                  step: "5",
                  title: "Copy the API token",
                  description:
                    "BotFather will provide a token like: 1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
                },
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <Badge
                    variant="outline"
                    className="w-6 h-6 flex items-center justify-center text-xs p-0"
                  >
                    {item.step}
                  </Badge>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Keep your bot token secure. Anyone
              with this token can control your bot.
            </AlertDescription>
          </Alert>

          <Button variant="outline" className="w-full" asChild>
            <a
              href="https://t.me/botfather"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open BotFather in Telegram
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PublishTelegram;
