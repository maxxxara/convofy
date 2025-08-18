import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Bot, Globe, Send, Info } from "lucide-react";
import type { BotGet } from "@/utils/types";

export function BasicSettings({
  bot,
  setBot,
}: {
  bot: BotGet;
  setBot: React.Dispatch<React.SetStateAction<BotGet | null>>;
}) {
  return (
    <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 py-0 to-white shadow-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg gap-0 py-[12px]">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Bot className="w-5 h-5" />
          </div>
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="botName" className="text-slate-700 font-medium">
              Bot Name
            </Label>
            <Input
              id="botName"
              value={bot?.name}
              onChange={(e) => {
                setBot({ ...bot, name: e.target.value });
              }}
              placeholder="e.g., Customer Support Bot"
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
            />
            <div className="flex items-start gap-2 text-xs text-slate-600 bg-blue-50 p-2 rounded-md">
              <Info className="w-3 h-3 mt-0.5 text-blue-500 flex-shrink-0" />
              <p>This name will be visible to users during conversations</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="botDescription"
              className="text-slate-700 font-medium"
            >
              Bot Description
            </Label>
            <Input
              id="botDescription"
              value={bot?.description}
              onChange={(e) => {
                setBot({ ...bot, description: e.target.value });
              }}
              placeholder="e.g., We are a customer support bot"
              className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
            />
            <div className="flex items-start gap-2 text-xs text-slate-600 bg-blue-50 p-2 rounded-md">
              <Info className="w-3 h-3 mt-0.5 text-blue-500 flex-shrink-0" />
              <p>
                This description will be visible to users during conversations
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 pt-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              Pro Tips
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>
                • Choose a name that reflects your bot's purpose and personality
              </li>
              <li>• Keep descriptions concise but informative</li>
              <li>• Consider your target audience when naming your bot</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
