import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Bot,
  ArrowLeft,
  Save,
  Globe,
  Send,
  Copy,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Code,
  TestTube,
  Eye,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BotPublication() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("telegram");
  const [telegramToken, setTelegramToken] = useState("");
  const [telegramStatus, setTelegramStatus] = useState<
    "idle" | "testing" | "connected" | "error"
  >("idle");
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  // Mock bot data
  const botData = {
    name: "Customer Support Bot",
    id: "cust-support-001",
    avatar: "🤖",
    color: "bg-blue-500",
  };

  const handleTelegramTokenSubmit = async () => {
    if (!telegramToken.trim()) return;

    setTelegramStatus("testing");
    // Simulate API call to validate token
    setTimeout(() => {
      if (telegramToken.startsWith("1234567890:")) {
        setTelegramStatus("connected");
      } else {
        setTelegramStatus("error");
      }
    }, 2000);
  };

  const widgetScript = `<!-- ChatBot Widget Script -->
<script>
  (function() {
    var chatbotConfig = {
      botId: '${botData.id}',
      apiUrl: 'https://api.ragchatbot.com',
      position: 'bottom-right',
      primaryColor: '#3b82f6',
      avatar: '${botData.avatar}',
      welcomeMessage: 'Hello! How can I help you today?'
    };
    
    var script = document.createElement('script');
    script.src = 'https://cdn.ragchatbot.com/widget.js';
    script.async = true;
    script.onload = function() {
      window.RagChatbot.init(chatbotConfig);
    };
    document.head.appendChild(script);
  })();
</script>`;

  const webhookUrl = `https://api.ragchatbot.com/webhook/telegram/${botData.id}`;

  const copyToClipboard = async (text: string, type: "script" | "webhook") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "script") {
        setCopiedScript(true);
        setTimeout(() => setCopiedScript(false), 2000);
      } else {
        setCopiedWebhook(true);
        setTimeout(() => setCopiedWebhook(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate("/bots")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bots
        </Button>
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${botData.color} rounded-lg flex items-center justify-center text-white`}
          >
            <span>{botData.avatar}</span>
          </div>
          <div>
            <h1 className="mb-1">Publish Bot</h1>
            <p className="text-muted-foreground">{botData.name}</p>
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="telegram" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Telegram Bot
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Website Widget
          </TabsTrigger>
        </TabsList>

        <TabsContent value="telegram" className="space-y-6">
          {/* Telegram Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Create Telegram Bot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Step-by-step instructions:</h4>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs p-0"
                    >
                      1
                    </Badge>
                    <div>
                      <p className="font-medium">
                        Open Telegram and search for @BotFather
                      </p>
                      <p className="text-muted-foreground">
                        BotFather is the official bot for creating Telegram bots
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs p-0"
                    >
                      2
                    </Badge>
                    <div>
                      <p className="font-medium">
                        Start a chat and send /newbot
                      </p>
                      <p className="text-muted-foreground">
                        This command creates a new bot
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs p-0"
                    >
                      3
                    </Badge>
                    <div>
                      <p className="font-medium">Choose a name for your bot</p>
                      <p className="text-muted-foreground">
                        Example: "{botData.name}"
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs p-0"
                    >
                      4
                    </Badge>
                    <div>
                      <p className="font-medium">
                        Choose a username ending with "bot"
                      </p>
                      <p className="text-muted-foreground">
                        Example: "customer_support_bot" or "help_desk_bot"
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs p-0"
                    >
                      5
                    </Badge>
                    <div>
                      <p className="font-medium">Copy the API token</p>
                      <p className="text-muted-foreground">
                        BotFather will provide a token like:
                        1234567890:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
                      </p>
                    </div>
                  </li>
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
                    className="flex-1"
                  />
                  <Button
                    onClick={handleTelegramTokenSubmit}
                    disabled={
                      !telegramToken.trim() || telegramStatus === "testing"
                    }
                  >
                    {telegramStatus === "testing" ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <TestTube className="w-4 h-4" />
                    )}
                    {telegramStatus === "testing"
                      ? "Testing..."
                      : "Test Connection"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Paste the token you received from BotFather
                </p>
              </div>

              {telegramStatus === "connected" && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>
                      ✅ Bot connected successfully! Your Telegram bot is now
                      active.
                    </span>
                    {getStatusIcon(telegramStatus)}
                  </AlertDescription>
                </Alert>
              )}

              {telegramStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    ❌ Invalid token. Please check your token and try again.
                  </AlertDescription>
                </Alert>
              )}

              {telegramStatus === "connected" && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h5 className="font-medium mb-2">
                    Webhook URL (for advanced users)
                  </h5>
                  <div className="flex gap-2">
                    <Input
                      value={webhookUrl}
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(webhookUrl, "webhook")}
                    >
                      {copiedWebhook ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This webhook is automatically configured for your bot
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="website" className="space-y-6">
          {/* Widget Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Widget Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 relative min-h-64 border-2 border-dashed border-border">
                <div className="text-center text-muted-foreground mb-8">
                  <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Your website content appears here</p>
                </div>

                {/* Mock chat widget */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white rounded-lg shadow-lg border w-80 max-h-96">
                    {/* Widget header */}
                    <div
                      className={`${botData.color} text-white p-3 rounded-t-lg flex items-center gap-3`}
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm">{botData.avatar}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{botData.name}</h4>
                        <p className="text-xs opacity-90">Online</p>
                      </div>
                    </div>

                    {/* Widget content */}
                    <div className="p-4 space-y-3">
                      <div className="bg-gray-100 rounded-lg p-3 text-sm">
                        Hello! How can I help you today?
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your message..."
                          className="flex-1 text-sm"
                        />
                        <Button size="sm">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Installation Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Installation Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-3">
                  How to add the widget to your website:
                </h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs p-0"
                    >
                      1
                    </Badge>
                    <span>Copy the script code below</span>
                  </li>
                  <li className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs p-0"
                    >
                      2
                    </Badge>
                    <span>
                      Paste it before the closing &lt;/body&gt; tag of your
                      website
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Badge
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center text-xs p-0"
                    >
                      3
                    </Badge>
                    <span>
                      The chat widget will appear automatically on your website
                    </span>
                  </li>
                </ol>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Widget Script</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(widgetScript, "script")}
                  >
                    {copiedScript ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Script
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{widgetScript}</pre>
                </div>
              </div>

              <Alert>
                <MessageSquare className="h-4 w-4" />
                <AlertDescription>
                  <strong>Note:</strong> The widget will automatically match
                  your bot's configuration including colors, welcome message,
                  and personality.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h5 className="font-medium mb-2">✅ Works with:</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• WordPress</li>
                    <li>• Shopify</li>
                    <li>• Squarespace</li>
                    <li>• Custom HTML sites</li>
                    <li>• React/Vue/Angular apps</li>
                  </ul>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h5 className="font-medium mb-2">📱 Features:</h5>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Mobile responsive</li>
                    <li>• Customizable colors</li>
                    <li>• Typing indicators</li>
                    <li>• Message history</li>
                    <li>• GDPR compliant</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
