import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  MessageSquare,
  MessageCircleHeart,
  AlertTriangle,
  RefreshCw,
  Wand2,
  Copy,
} from "lucide-react";
import { useState } from "react";
import type { BotGet } from "@/utils/types";

const messageTemplates = {
  welcome: [
    "Hello! 👋 How can I help you today?",
    "Hi there! I'm here to assist you. What can I do for you?",
    "Welcome! I'm your AI assistant. Feel free to ask me anything.",
    "Hey! Ready to help you with any questions you might have.",
  ],
  fallback: [
    "I'm sorry, I don't have information about that. Let me connect you with a human agent.",
    "I'm not sure about that specific question. Would you like me to get a human to help you?",
    "That's outside my knowledge area. Let me find someone who can better assist you.",
    "I apologize, but I need to get additional help for this request. One moment please!",
  ],
};

export function MessageSettings({
  bot,
  setBot,
}: {
  bot: BotGet;
  setBot: React.Dispatch<React.SetStateAction<BotGet | null>>;
}) {
  const [fallbackMessage, setFallbackMessage] = useState("");

  const copyTemplate = (template: string, type: "welcome" | "fallback") => {
    if (type === "welcome") {
      setBot({ ...bot, welcomeMessage: template });
    } else {
      setFallbackMessage(template);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 bg-gradient-to-br from-slate-50/50 to-white shadow-sm py-0">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg gap-0 py-[12px]">
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
            Default Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircleHeart className="w-5 h-5 text-emerald-600" />
              <Label
                htmlFor="welcomeMessage"
                className="text-slate-700 font-medium"
              >
                First Message (Welcome)
              </Label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Textarea
                  id="welcomeMessage"
                  placeholder="Hello! How can I help you today?"
                  className="min-h-24 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 bg-white"
                  value={bot?.welcomeMessage}
                  onChange={(e) =>
                    setBot({ ...bot, welcomeMessage: e.target.value })
                  }
                />
                <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-md">
                  <MessageCircleHeart className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                  <p>
                    This message will be shown when users first start a
                    conversation
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-600">
                  Quick Templates
                </Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {messageTemplates.welcome.map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full text-left justify-start h-auto p-2 text-xs border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      onClick={() => copyTemplate(template, "welcome")}
                    >
                      <Copy className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{template}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <Label
                  htmlFor="fallbackMessage"
                  className="text-slate-700 font-medium"
                >
                  When Bot Cannot Help
                </Label>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Textarea
                    id="fallbackMessage"
                    placeholder="I'm sorry, I don't have information about that. Let me connect you with a human agent."
                    className="min-h-20 border-slate-200 focus:border-red-400 focus:ring-red-400/20 bg-white"
                    value={fallbackMessage}
                    onChange={(e) => setFallbackMessage(e.target.value)}
                  />
                  <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-md">
                    <AlertTriangle className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
                    <p>
                      Shown when the bot cannot find relevant information or
                      doesn't understand the query
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-slate-600">
                    Quick Templates
                  </Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {messageTemplates.fallback.map((template, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start h-auto p-2 text-xs border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        onClick={() => copyTemplate(template, "fallback")}
                      >
                        <Copy className="w-3 h-3 mr-2 flex-shrink-0" />
                        <span className="truncate">{template}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-4 border border-slate-200">
            <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-blue-600" />
              Message Writing Tips
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-slate-700">
                  Welcome Messages
                </h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Keep it friendly and inviting</li>
                  <li>• Set clear expectations</li>
                  <li>• Include your bot's main purpose</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-slate-700">
                  Fallback Messages
                </h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Acknowledge the limitation politely</li>
                  <li>• Offer human assistance when needed</li>
                  <li>• Maintain helpful and apologetic tone</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
