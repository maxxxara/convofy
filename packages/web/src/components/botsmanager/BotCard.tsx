import { Card, CardContent, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical, Settings, Eye, Copy, Trash2 } from "lucide-react";
import UserAvatar from "../utils/UserAvatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

export function BotCard() {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate("/bots/settings/1")}
      className="bg-white border border-slate-200/60 w-fit shadow-sm py-[14px] hover:shadow-md transition-all duration-200 hover:border-slate-300/60 cursor-pointer"
    >
      <CardContent className="py-0 px-[12px] flex items-start justify-between">
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-2">
            <UserAvatar initials="F" className="bg-sky-200 text-sky-800" />
            <div className="flex flex-col gap-[6px]">
              <CardTitle className="text-sm font-semibold text-slate-900 leading-tight">
                Figma Bot
              </CardTitle>
              <p className="text-xs text-slate-500 leading-tight truncate">
                Design assistant for Figma workflows
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[8px]">
            <Badge
              variant="default"
              className="text-xs bg-slate-100 text-slate-800"
            >
              Published
            </Badge>
            <Badge variant="default" className="text-xs bg-blue-500 text-white">
              Telegram
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="text-sm">
              <Settings className="w-3 h-3 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <Eye className="w-3 h-3 mr-2" />
              Analytics
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <Copy className="w-3 h-3 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm text-destructive">
              <Trash2 className="w-3 h-3 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
