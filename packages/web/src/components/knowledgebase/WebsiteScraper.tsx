import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Globe,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Clock,
} from "lucide-react";

interface ScrapedWebsite {
  id: string;
  url: string;
  title: string;
  status: "queued" | "scraping" | "completed" | "error";
  progress: number;
  pagesFound: number;
  pagesProcessed: number;
  lastUpdated: string;
}

export function WebsiteScraper() {
  return (
    <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 py-0 to-white shadow-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg gap-0 py-[12px]">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Globe className="w-5 h-5" />
          </div>
          Website Scraping
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {/* Add Website Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label
                htmlFor="websiteUrl"
                className="text-slate-700 font-medium"
              >
                Website URL
              </Label>
              <Input
                id="websiteUrl"
                placeholder="https://example.com"
                className="border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 bg-white"
              />
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Start Scraping
          </Button>
        </div>

        {/* Scraped Websites */}
        <div className="space-y-2">
          <h4 className="font-medium text-slate-800 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            Scraped Websites (3)
          </h4>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="border border-blue-100 rounded-lg p-3 bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <Globe className="w-4 h-4" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium text-slate-800 truncate">
                          https://example.com
                        </h5>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="border-t border-blue-100 pt-3">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
            <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              Pro Tips
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Start with main domain pages for best results</li>
              <li>• Large websites may take several minutes to process</li>
              <li>• Content is automatically updated when websites change</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
