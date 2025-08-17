import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { DocumentUploader } from "../components/knowledgebase/DocumentUploader";
import { WebsiteScraper } from "../components/knowledgebase/WebsiteScraper";
import { FAQCreator } from "../components/knowledgebase/FAQCreator";
import { BotSelectionModal } from "../components/knowledgebase/BotSelectionModal";
import { useNavigate } from "react-router-dom";

export function KnowledgeUpload() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("documents");
  const [showBotSelectionModal, setShowBotSelectionModal] = useState(false);

  const handleSave = () => {
    setShowBotSelectionModal(true);
  };

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      <div className="p-6">
        <PageHeader
          title="Add Knowledge Source"
          description="Upload documents, scrape websites, or create FAQ entries"
          breadcrumb={
            <Button
              variant="ghost"
              onClick={() => navigate("/knowledge")}
              className="hover:bg-blue-50 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Knowledge Base
            </Button>
          }
          actions={
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <Check className="w-4 h-4 mr-2" />
              Save & Assign to Bots
            </Button>
          }
        />

        <Card className="border-blue-100 bg-white shadow-sm space-y-0 gap-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800">
              Choose Source Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-fit grid-cols-3 mb-6">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="websites">Websites</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="documents" className="mt-0">
                <DocumentUploader />
              </TabsContent>

              <TabsContent value="websites" className="mt-0">
                <WebsiteScraper />
              </TabsContent>

              <TabsContent value="faq" className="mt-0">
                <FAQCreator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <BotSelectionModal
          open={showBotSelectionModal}
          onOpenChange={setShowBotSelectionModal}
        />

        {/* Save Warning */}
        {false && (
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
