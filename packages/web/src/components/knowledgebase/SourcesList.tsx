import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, Filter, Trash2, Database, Bot, X } from "lucide-react";
import { BotSelectionModal } from "./BotSelectionModal";
import SourceCard from "./SourceCard";
import SelectMenu from "./SelectMenu";

export function SourcesList() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSources, setSelectedSources] = useState<number[]>([]);
  const [showBotModal, setShowBotModal] = useState(false);

  const handleSourceSelect = (index: number) => {
    setSelectedSources((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col items-center sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search knowledge sources..."
            className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400/20 mt-0"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Sort: Last Updated
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>Last Updated</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-fit grid-cols-4">
          <TabsTrigger value="all" className="text-xs sm:text-sm min-w-[120px]">
            All (3)
          </TabsTrigger>
          <TabsTrigger
            value="document"
            className="text-xs sm:text-sm min-w-[120px]"
          >
            Docs (1)
          </TabsTrigger>
          <TabsTrigger
            value="website"
            className="text-xs sm:text-sm min-w-[120px]"
          >
            Web (1)
          </TabsTrigger>
          <TabsTrigger value="faq" className="text-xs sm:text-sm min-w-[120px]">
            FAQ (1)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {/* Selection Menu */}
          {selectedSources.length > 0 && (
            <SelectMenu selectedSources={selectedSources} />
          )}

          {true ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SourceCard
                  key={index}
                  index={index}
                  selected={selectedSources.includes(index)}
                  onSelect={() => handleSourceSelect(index)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/30">
              <Database className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="font-medium text-slate-800 mb-2">
                No sources found
              </h3>
              <p className="text-slate-600 mb-4">
                Add your first knowledge source to get started
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <BotSelectionModal open={showBotModal} onOpenChange={setShowBotModal} />
    </div>
  );
}
