import { Card, CardContent } from "../ui/card";
import {
  Database,
  FileText,
  Globe,
  HelpCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface StatsData {
  totalSources: number;
  documents: number;
  websites: number;
  faqs: number;
  totalChunks: number;
  processing: number;
  failed: number;
  lastUpdated: string;
}

interface KnowledgeStatsProps {
  stats: StatsData;
}

export function KnowledgeStats({ stats }: KnowledgeStatsProps) {
  const statCards = [
    {
      label: "Total Sources",
      value: stats.totalSources,
      icon: Database,
      color: "blue",
      description: "All knowledge sources",
    },
    {
      label: "Documents",
      value: stats.documents,
      icon: FileText,
      color: "green",
      description: "PDF, DOCX, TXT files",
    },
    {
      label: "Websites",
      value: stats.websites,
      icon: Globe,
      color: "purple",
      description: "Scraped web pages",
    },
    {
      label: "FAQ Items",
      value: stats.faqs,
      icon: HelpCircle,
      color: "orange",
      description: "Question & answer pairs",
    },
    {
      label: "Knowledge Chunks",
      value: stats.totalChunks,
      icon: TrendingUp,
      color: "indigo",
      description: "Processed text segments",
    },
    {
      label: "Processing",
      value: stats.processing,
      icon: Clock,
      color: "yellow",
      description: "Currently being processed",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-50",
          icon: "text-blue-600",
          border: "border-blue-100",
        };
      case "green":
        return {
          bg: "bg-green-50",
          icon: "text-green-600",
          border: "border-green-100",
        };
      case "purple":
        return {
          bg: "bg-purple-50",
          icon: "text-purple-600",
          border: "border-purple-100",
        };
      case "orange":
        return {
          bg: "bg-orange-50",
          icon: "text-orange-600",
          border: "border-orange-100",
        };
      case "indigo":
        return {
          bg: "bg-indigo-50",
          icon: "text-indigo-600",
          border: "border-indigo-100",
        };
      case "yellow":
        return {
          bg: "bg-yellow-50",
          icon: "text-yellow-600",
          border: "border-yellow-100",
        };
      default:
        return {
          bg: "bg-slate-50",
          icon: "text-slate-600",
          border: "border-slate-100",
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          const Icon = stat.icon;

          return (
            <Card
              key={index}
              className={`border ${colors.border} ${colors.bg}/50 hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-green-100 bg-gradient-to-br from-green-50/50 to-white">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Ready to Use</p>
                <p className="text-sm text-slate-600">
                  {stats.totalSources - stats.processing - stats.failed} sources
                  processed successfully
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {stats.failed > 0 && (
          <Card className="border-red-100 bg-gradient-to-br from-red-50/50 to-white">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Needs Attention</p>
                  <p className="text-sm text-slate-600">
                    {stats.failed} sources failed processing
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Last Updated */}
      <Card className="border-slate-100 bg-gradient-to-br from-slate-50/50 to-white">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <p className="font-medium text-slate-800">Last Updated</p>
                <p className="text-sm text-slate-600">{stats.lastUpdated}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Knowledge base status</p>
              <p className="text-sm font-medium text-slate-700">
                {stats.processing > 0 ? "Processing..." : "Up to date"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
