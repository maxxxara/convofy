import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  File,
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
}

export function DocumentUploader() {
  return (
    <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 py-0 to-white shadow-sm">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg gap-0 py-[12px]">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          Upload Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex gap-4">
          {/* Upload Area */}
          <div
            className={`w-[30%] border-2 border-dashed flex flex-col items-center justify-center rounded-lg p-6 text-center transition-colors ${"border-blue-200 hover:border-blue-300 hover:bg-blue-50/30"}`}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-slate-800 mb-2">
              Drop files here or click to browse
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Supports PDF, DOCX, TXT, MD files up to 10MB each
            </p>
            <Input
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.md"
              className="hidden"
              id="file-upload"
            />
            <Label htmlFor="file-upload">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
            </Label>
          </div>

          {/* Uploaded Files */}
          {true && (
            <div className="space-y-2 w-[70%]">
              <h4 className="font-medium text-slate-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Uploaded Files (3)
              </h4>
              <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-blue-100 rounded-lg p-3 bg-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4" />
                        <div>
                          <p className="font-medium text-sm text-slate-800">
                            Document {index + 1}
                          </p>
                          <p className="text-xs text-slate-500">100 KB</p>
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

                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Ready for use
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Pro Tips */}
        <div className="border-t border-blue-100 pt-3">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
            <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              Pro Tips
            </h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>
                • Larger documents will be automatically split into chunks for
                better processing
              </li>
              <li>• PDF files with images and tables are fully supported</li>
              <li>
                • Documents are processed using advanced AI for optimal
                knowledge extraction
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
