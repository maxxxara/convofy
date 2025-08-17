import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Bot, X, Trash2 } from "lucide-react";

function SelectMenu({ selectedSources }: { selectedSources: number[] }) {
  return (
    <Card className="py-[12px] bg-transparent border-0 shadow-none">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {selectedSources.length} selected
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {}}
              className="text-blue-600 hover:bg-blue-100"
            >
              Select All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {}}
              className="text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="border-blue-200 text-blue-600 hover:bg-blue-100"
            >
              <Bot className="w-4 h-4 mr-2" />
              Assign to Bots
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SelectMenu;
