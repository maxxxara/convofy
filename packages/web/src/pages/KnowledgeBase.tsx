import React from "react";
import { Button } from "../components/ui/button";
import { ArrowLeft, Plus, RefreshCw } from "lucide-react";
import { PageHeader } from "../components/shared/PageHeader";
import { KnowledgeStats } from "../components/knowledgebase/KnowledgeStats";
import { SourcesList } from "../components/knowledgebase/SourcesList";
import type { KnowledgeSource } from "../components/knowledgebase/types";
import { useNavigate } from "react-router-dom";

export function KnowledgeBase() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50/30 min-h-screen">
      <div className="p-6">
        <PageHeader
          title="Knowledge Base"
          description="Manage documents, websites, and FAQ sources for your chatbots"
          breadcrumb={
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="hover:bg-blue-50 hover:text-blue-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          }
          actions={
            <>
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={() => navigate("/knowledge/upload")}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Source
              </Button>
            </>
          }
        />

        <div className="space-y-4">
          <SourcesList />
        </div>
      </div>
    </div>
  );
}
