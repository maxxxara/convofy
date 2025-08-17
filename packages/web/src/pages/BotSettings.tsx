import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ArrowLeft, Save, TestTube } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { BasicSettings } from "../components/botsettings/BasicSettings";
import { AppearanceSettings } from "../components/botsettings/AppearanceSettings";
import { PersonalitySettings } from "../components/botsettings/PersonalitySettings";
import { MessageSettings } from "../components/botsettings/MessageSettings";
import { PublishSettings } from "../components/botsettings/PublishSettings";
import { useNavigate } from "react-router-dom";

export function BotSettings() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      <div className="p-6">
        <PageHeader
          title={`Bot Settings - Customer Support Bot`}
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
                onClick={() => {}}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
              >
                <TestTube className="w-4 h-4 mr-2" />
                Test Bot
              </Button>
              <Button
                onClick={() => {}}
                disabled={false}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          }
        />

        <Tabs defaultValue="basic">
          <TabsList>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>
          {/* Content Areas */}
          <TabsContent value="basic" className="space-y-6">
            <BasicSettings />
            <AppearanceSettings />
          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            <PersonalitySettings />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <MessageSettings />
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <PublishSettings />
          </TabsContent>
        </Tabs>

        {/* Save Warning */}
        {true && (
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
                  onClick={() => {}}
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
