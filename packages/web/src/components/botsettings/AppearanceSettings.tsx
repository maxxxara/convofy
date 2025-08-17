import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Palette, Upload, X, Sparkles, Check } from "lucide-react";
import { useState, useRef } from "react";

const emojiOptions = [
  "🤖",
  "💬",
  "🎯",
  "⭐",
  "🚀",
  "💡",
  "🎪",
  "💼",
  "🔧",
  "📞",
  "👋",
  "🎨",
];

const colorOptions = [
  {
    name: "Ocean Blue",
    class: "bg-blue-500",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "Emerald",
    class: "bg-emerald-500",
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    name: "Violet",
    class: "bg-violet-500",
    gradient: "from-violet-400 to-violet-600",
  },
  {
    name: "Amber",
    class: "bg-amber-500",
    gradient: "from-amber-400 to-amber-600",
  },
  { name: "Rose", class: "bg-rose-500", gradient: "from-rose-400 to-rose-600" },
  { name: "Teal", class: "bg-teal-500", gradient: "from-teal-400 to-teal-600" },
];

export function AppearanceSettings() {
  const [selectedEmoji, setSelectedEmoji] = useState("🤖");
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <Card className="border-purple-100 bg-gradient-to-br from-purple-50/50 to-white shadow-sm py-0">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg py-[12px] gap-0">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Palette className="w-5 h-5" />
          </div>
          Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <Label className="text-slate-700 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Avatar Preview
          </Label>

          {/* Current Avatar Preview */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
            <div
              className={`w-16 h-16 bg-gradient-to-br ${colorOptions[selectedColor].gradient} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}
            >
              <span>{selectedEmoji}</span>
            </div>
            <div>
              <p className="font-medium text-slate-800">Your Bot Avatar</p>
              <p className="text-sm text-slate-600">
                This is how users will see your bot
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  Upload Custom Image
                </Label>
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center hover:border-purple-300 transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() =>
                      document.getElementById("avatar-upload")?.click()
                    }
                  >
                    Choose Image
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              </div>

              {/* Emoji Options */}
              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  Or Choose Emoji
                </Label>
                <div className="grid grid-cols-6 gap-4 w-fit">
                  {emojiOptions.map((emoji, index) => (
                    <Button
                      key={index}
                      variant={selectedEmoji === emoji ? "default" : "outline"}
                      size="sm"
                      className={`w-10 h-10 text-lg relative ${
                        selectedEmoji === emoji
                          ? "bg-purple-500 hover:bg-purple-600 border-purple-500"
                          : "border-purple-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                      onClick={() => setSelectedEmoji(emoji)}
                    >
                      {emoji}
                      {selectedEmoji === emoji && (
                        <Check className="w-3 h-3 absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-slate-700 font-medium">
                Brand Color Theme
              </Label>
              <div className="space-y-3">
                {colorOptions.map((color, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedColor === index
                        ? "border-purple-300 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => setSelectedColor(index)}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color.gradient} shadow-sm flex items-center justify-center`}
                    >
                      {selectedColor === index && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{color.name}</p>
                      <p className="text-xs text-slate-500">
                        Beautiful gradient theme
                      </p>
                    </div>
                    {selectedColor === index && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
