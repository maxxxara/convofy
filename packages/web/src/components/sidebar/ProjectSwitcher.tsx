import { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Building2, Check, Plus, ChevronDown } from "lucide-react";

interface Project {
  id: string;
  name: string;
  role: string;
  isActive: boolean;
}

const mockProjects: Project[] = [
  { id: "1", name: "TechCorp Support", role: "Admin", isActive: true },
  { id: "2", name: "Sales Assistant", role: "Member", isActive: false },
  { id: "3", name: "HR Helper", role: "Admin", isActive: false },
];

interface ProjectSwitcherProps {
  collapsed?: boolean;
}

export function ProjectSwitcher({ collapsed = false }: ProjectSwitcherProps) {
  const [projects] = useState<Project[]>(mockProjects);
  const activeProject = projects.find((p) => p.isActive);

  if (collapsed) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0 justify-center"
            title={activeProject?.name}
          >
            <Building2 className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {projects.map((project) => (
            <DropdownMenuItem
              key={project.id}
              className="flex items-center justify-between p-3"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{project.name}</span>
                  {project.isActive && <Check className="w-4 h-4" />}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-3">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-3 h-auto bg-accent/50 hover:bg-accent/70"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-medium text-sm">{activeProject?.name}</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            className="flex items-center justify-between p-3"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium">{project.name}</span>
                {project.isActive && <Check className="w-4 h-4" />}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
