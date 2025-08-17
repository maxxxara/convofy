import { Card, CardContent } from "../ui/card";
import { FileText, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Eye, Edit, Copy, Download, Trash2, MoreVertical } from "lucide-react";

interface SourceCardProps {
  index: number;
  selected?: boolean;
  onSelect?: () => void;
}

function SourceCard({ index, selected = false, onSelect }: SourceCardProps) {
  return (
    <Card
      key={index}
      className={`border-blue-100 hover:shadow-md transition-all cursor-pointer ${
        selected ? "ring-2 ring-blue-500 border-blue-300 bg-blue-50/30" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="px-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selected}
                onChange={onSelect}
                onClick={(e) => e.stopPropagation()}
                className="mt-1"
              />
              <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="font-semibold text-slate-800 truncate">
                  Source {index + 1}
                </h4>
                <Badge variant="outline" className={`text-xs`}>
                  Document
                </Badge>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Size:</span>
                  <span className="font-medium">100KB</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Chunks:</span>
                  <span className="font-medium">100</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-medium capitalize">processed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="font-medium">10/10/2025</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 font-medium">
                  Used by:
                </span>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                    >
                      Bot {index + 1}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => {}}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default SourceCard;
