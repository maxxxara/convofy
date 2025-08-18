import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Send, Globe, Rocket, Zap, CheckCircle } from "lucide-react";
import { useState } from "react";
import PublishWidget from "./PublishWidget";
import PublishTelegram from "./PublishTelegram";
import type { BotGet } from "@/utils/types";

const platforms = [
  {
    id: "WEB_WIDGET",
    name: "Website Widget",
    icon: Globe,
    description: "Embed chat widget on your website",
    color: "from-blue-500 to-blue-600",
    lightColor: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-100",
  },
  {
    id: "TELEGRAM",
    name: "Telegram Bot",
    icon: Send,
    description: "Deploy as a Telegram bot",
    color: "from-blue-400 to-blue-500",
    lightColor: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-100",
  },
];

export function PublishSettings({
  bot,
  setBot,
}: {
  bot: BotGet;
  setBot: React.Dispatch<React.SetStateAction<BotGet | null>>;
}) {
  return (
    <div className="space-y-6">
      <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white shadow-sm py-0">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg gap-0 py-[12px]">
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Rocket className="w-5 h-5" />
            </div>
            Publish Your Bot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <Label className="text-slate-700 font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-500" />
              Choose Publishing Platform
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => {
                const IconComponent = platform.icon;
                const isSelected = bot.channel === platform.id;

                return (
                  <Card
                    key={platform.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? `${platform.borderColor} border-2 shadow-md`
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    onClick={() =>
                      setBot({
                        ...bot,
                        channel: platform.id as "WEB_WIDGET" | "TELEGRAM",
                      })
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br ${
                            isSelected ? platform.color : "bg-gray-100"
                          } text-white`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-800">
                              {platform.name}
                            </h3>
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mt-1">
                            {platform.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        {bot.channel === "WEB_WIDGET" && <PublishWidget />}
        {bot.channel === "TELEGRAM" && <PublishTelegram />}
      </div>
    </div>
  );
}
