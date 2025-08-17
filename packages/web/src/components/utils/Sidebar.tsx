import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { UserMenuWithProjects } from "../sidebar/UserMenuWithProjects";
import { Bot, SidebarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSidebarHelpers } from "@/hooks/useSidebarHelpers";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const { navigationItems, activeTab } = useSidebarHelpers();
  const navigate = useNavigate();
  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div>
        {!collapsed ? (
          // Expanded state layout
          <div className="flex flex-col gap-[8px] py-[8px]">
            <div className="flex items-center justify-between px-[8px]">
              {/* Logo */}
              <div className="flex items-center gap-[6px] w-auto h-auto hover:bg-transparent cursor-default">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-medium text-sm">Convofy</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="w-10 h-10 hover:bg-accent"
                title="Collapse sidebar"
              >
                <SidebarIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          // Collapsed state layout
          <div className="flex flex-col items-center justify-center gap-[8px] py-[8px]">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="w-10 h-10 hover:bg-accent mx-auto flex"
                >
                  <SidebarIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={6}>
                Expand sidebar
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "flex-1 gap-[8px] flex flex-col mt-[8px]",
          !collapsed && "px-[8px]"
        )}
      >
        {navigationItems.map((item) => {
          const navButton = (
            <Button
              key={item.path}
              variant={activeTab === item.path ? "secondary" : "ghost"}
              className={cn(
                collapsed && "w-10 h-10 mx-auto flex",
                !collapsed && "justify-start"
              )}
              size={collapsed ? "sm" : "default"}
              onClick={() => {
                navigate(item.path);
              }}
            >
              <item.icon className="w-4 h-4" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>{navButton}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={6}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return navButton;
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className={cn("py-[8px]", !collapsed && "px-[8px]")}>
        <UserMenuWithProjects collapsed={collapsed} />
      </div>
    </div>
  );
}
