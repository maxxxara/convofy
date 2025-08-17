export interface KnowledgeSource {
  id: number;
  title: string;
  type: "document" | "website" | "faq";
  format: string;
  size: string;
  status: "processed" | "processing" | "failed";
  chunks: number;
  lastUpdated: string;
  usedByBots: string[];
}
