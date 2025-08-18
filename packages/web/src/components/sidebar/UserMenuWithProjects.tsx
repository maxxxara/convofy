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
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

function ProjectList() {
  const { data: projects } = trpc.project.getAll.useQuery();
  const { data: currentProject } = trpc.project.getCurrent.useQuery();
  return (
    <>
      <DropdownMenuLabel>Projects</DropdownMenuLabel>
      {projects?.map((project) => (
        <DropdownMenuItem
          key={project.id}
          className={cn(
            "flex items-center justify-between p-3",
            project.id === currentProject?.id && "bg-accent/50"
          )}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{project.title}</span>
              {project.id === currentProject?.id && (
                <Check className="w-4 h-4" />
              )}
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
  const navigate = useNavigate();
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
      <DropdownMenuItem
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
        className="text-red-600 focus:text-red-600"
      >
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
  const { data: currentUser } = trpc.user.getCurrentUser.useQuery();

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
                <p className="text-sm font-medium truncate">
                  {currentUser?.name} {currentUser?.surname}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentUser?.email}
                </p>
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
