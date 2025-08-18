import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ArrowLeft, Rocket, Save, TestTube } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { BasicSettings } from "../components/botsettings/BasicSettings";
import { AppearanceSettings } from "../components/botsettings/AppearanceSettings";
import { PersonalitySettings } from "../components/botsettings/PersonalitySettings";
import { MessageSettings } from "../components/botsettings/MessageSettings";
import { PublishSettings } from "../components/botsettings/PublishSettings";
import { useNavigate, useParams } from "react-router-dom";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import type { BotGet } from "@/utils/types";
import { toast } from "sonner";

export function BotSettings() {
  const [bot, setBot] = useState<BotGet | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();
  const { botId } = useParams();
  const trpcUtils = trpc.useUtils();
  if (!botId) {
    navigate("/bots");
    return <></>;
  }
  const { data: botData } = trpc.bot.get.useQuery({ botId });
  const { data: botPublication } = trpc.bot.getPublication.useQuery({ botId });
  const { mutateAsync: updateBot } = trpc.bot.update.useMutation();
  const { mutateAsync: updatePublication } =
    trpc.bot.updatePublication.useMutation();

  useEffect(() => {
    if (botData) {
      setBot(botData);
    }
  }, [botData]);

  useEffect(() => {
    if (bot) {
      setHasChanges(
        bot.name !== botData?.name ||
          bot.description !== botData?.description ||
          bot.avatar !== botData?.avatar ||
          bot.welcomeMessage !== botData?.welcomeMessage ||
          bot.personalityPrompt !== botData?.personalityPrompt ||
          bot.channel !== botData?.channel
      );
    }
  }, [bot, botData]);

  useEffect(() => {
    console.log("botData", botData);
  }, [botData]);

  const handleSave = async () => {
    if (!botPublication) return;
    if (bot) {
      if (bot.channel !== botData?.channel) {
        await updatePublication({
          botPublicationId: botPublication.id,
          status: "DRAFT",
          scriptConfig: botPublication.scriptConfig || {},
          telegramToken: botPublication.telegramToken || undefined,
        });
      }
      await updateBot({
        botId: bot.botId,
        name: bot.name,
        description: bot.description,
        avatar: bot.avatar || undefined,
        welcomeMessage: bot.welcomeMessage || undefined,
        personalityPrompt: bot.personalityPrompt || undefined,
        channel: bot.channel,
      });

      await trpcUtils.bot.get.invalidate({ botId });
      await trpcUtils.bot.getPublication.invalidate({ botId });

      toast.success("Bot updated successfully");
    }
  };

  const handlePublish = async () => {
    if (!botPublication) return;
    if (bot) {
      await updatePublication({
        botPublicationId: botPublication.id,
        status: "PUBLISHED",
        scriptConfig: botPublication.scriptConfig || {},
        telegramToken: botPublication.telegramToken || undefined,
      });
      await trpcUtils.bot.getPublication.invalidate({ botId });
      toast.success("Bot published successfully");
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      <div className="p-6">
        <PageHeader
          title={`Bot Settings - ${bot?.name}`}
          breadcrumb={
            <Button
              variant="ghost"
              onClick={() => {
                navigate("/bots");
              }}
              className="hover:bg-blue-50 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bots
            </Button>
          }
          actions={
            <>
              <Button
                variant="outline"
                className="bg-green-600 hover:bg-green-700 text-white shadow-md"
                onClick={handlePublish}
                disabled={botPublication?.status === "PUBLISHED"}
              >
                <Rocket className="w-4 h-4 mr-2" />
                {botPublication?.status === "PUBLISHED"
                  ? "Published"
                  : "Publish"}
              </Button>
              <Button
                onClick={handleSave}
                disabled={false}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          }
        />

        {bot && (
          <Tabs defaultValue="basic">
            <TabsList>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="personality">Personality</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="publish">Publish</TabsTrigger>
            </TabsList>
            {/* Content Areas */}
            <TabsContent value="basic" className="space-y-6">
              <BasicSettings bot={bot} setBot={setBot} />
              <AppearanceSettings />
            </TabsContent>

            <TabsContent value="personality" className="space-y-6">
              <PersonalitySettings bot={bot} setBot={setBot} />
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <MessageSettings bot={bot} setBot={setBot} />
            </TabsContent>

            <TabsContent value="publish" className="space-y-6">
              <PublishSettings bot={bot} setBot={setBot} />
            </TabsContent>
          </Tabs>
        )}

        {/* Save Warning */}
        {hasChanges && (
          <div className="fixed top-6 right-6 z-50">
            <Card className="border-orange-200 py-0 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-lg">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-orange-800">
                  You have unsaved changes
                </p>
                <Button
                  size="sm"
                  variant="link"
                  onClick={handleSave}
                  className=" hover:text-orange-800 text-orange-600"
                >
                  Save Now
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
