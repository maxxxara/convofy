import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User, Settings, LogOut, Check, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import UserAvatar from "../utils/UserAvatar";

function ProjectList() {
  return (
    <>
      <DropdownMenuLabel>Projects</DropdownMenuLabel>
      {[1, 2, 3].map((project) => (
        <DropdownMenuItem
          key={project}
          className={cn(
            "flex items-center justify-between p-3",
            project === 1 && "bg-accent/50"
          )}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">Project {project}</span>
              {project === 1 && <Check className="w-4 h-4" />}
            </div>
          </div>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem className="p-3">
        <Plus className="w-4 h-4 mr-2" />
        New Project
      </DropdownMenuItem>
    </>
  );
}

function UserActions() {
  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>
        <User className="w-4 h-4 mr-2" />
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600 focus:text-red-600">
        <LogOut className="w-4 h-4 mr-2" />
        Log out
      </DropdownMenuItem>
    </>
  );
}

export function UserMenuWithProjects({
  collapsed = false,
}: {
  collapsed: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "hover:bg-accent/50",
            collapsed
              ? "w-10 h-10 p-0 rounded-full relative mx-auto flex"
              : "w-full justify-between p-3 h-auto"
          )}
          size={collapsed ? "sm" : "default"}
        >
          {collapsed ? (
            <UserAvatar />
          ) : (
            <div className="flex items-center gap-3 w-full">
              <UserAvatar />
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Figma</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <ProjectList />
        <DropdownMenuSeparator />
        <UserActions />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
