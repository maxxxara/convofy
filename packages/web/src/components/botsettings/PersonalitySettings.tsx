import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  MessageCircle,
  Brain,
  Lightbulb,
  Users,
  Sparkles,
  Pencil,
} from "lucide-react";
import type { BotData } from "./types";
import { useState } from "react";

const personalityTemplates = [
  {
    name: "Professional & Helpful",
    icon: Users,
    description: "Formal, courteous, and solution-focused",
    prompt:
      "You are a professional and helpful assistant. Always maintain a courteous and formal tone while being solution-focused. Provide clear, concise answers and offer additional help when appropriate.",
  },
  {
    name: "Friendly & Casual",
    icon: MessageCircle,
    description: "Warm, approachable, and conversational",
    prompt:
      "You are a friendly and casual assistant. Use a warm, conversational tone and feel free to use appropriate informal language. Be enthusiastic and supportive while helping users.",
  },
  {
    name: "Expert & Technical",
    icon: Brain,
    description: "Knowledgeable, precise, and detailed",
    prompt:
      "You are an expert technical assistant. Provide detailed, accurate information with technical precision. Use industry terminology appropriately and offer comprehensive explanations.",
  },
  {
    name: "Custom",
    icon: Pencil,
    description: "Write your own prompt",
    prompt: "",
  },
];

export function PersonalitySettings() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");

  const handleTemplateSelect = (index: number) => {
    setSelectedTemplate(index);
    setCustomPrompt(personalityTemplates[index].prompt);
  };

  return (
    <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white shadow-sm py-0">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-lg gap-0 py-[12px]">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <MessageCircle className="w-5 h-5" />
          </div>
          Personality & Tone of Voice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <Label className="text-slate-700 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Quick Personality Templates
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {personalityTemplates.map((template, index) => {
              const IconComponent = template.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-start text-left space-y-2 ${
                    selectedTemplate === index
                      ? "border-indigo-300 bg-indigo-50 hover:bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                  onClick={() => handleTemplateSelect(index)}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div
                      className={`p-2 rounded-lg ${
                        selectedTemplate === index
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-slate-800">
                      {template.name}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {template.description}
                  </p>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tonePrompt" className="text-slate-700 font-medium">
            AI Personality Prompt
          </Label>
          <Textarea
            id="tonePrompt"
            placeholder="Describe how your bot should behave, its personality, tone of voice, and any specific instructions..."
            className="min-h-32 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 bg-white"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-md">
            <Lightbulb className="w-4 h-4 mt-0.5 text-indigo-600 flex-shrink-0" />
            <p>
              This prompt defines your bot's personality, communication style,
              and behavior. Be specific about the tone, expertise level, and how
              it should interact with users.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-lg p-4 border border-slate-200">
          <h4 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
            Personality Development Tips
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-slate-700">
                Tone & Style
              </h5>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Define communication tone (formal/casual)</li>
                <li>• Set empathy and helpfulness levels</li>
                <li>• Choose personality traits (enthusiastic/calm)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-slate-700">
                Behavior Guidelines
              </h5>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Specify expertise areas and limits</li>
                <li>• Define escalation criteria</li>
                <li>• Include response style preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
