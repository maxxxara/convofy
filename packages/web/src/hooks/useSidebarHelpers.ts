import {
  BarChart3,
  Bot,
  Settings,
  Users,
  Database,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/bots", label: "Bots", icon: Bot },
  { path: "/knowledge", label: "Knowledge Base", icon: Database },
  { path: "/chat-history", label: "Chat History", icon: MessageSquare },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/team", label: "Team", icon: Users },
  { path: "/settings", label: "Settings", icon: Settings },
];

export const useSidebarHelpers = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path === "/" || path === "/") return "/";
    if (path === "/bots") return "/bots";
    if (path === "/knowledge") return "/knowledge";
    if (path === "/chat-history") return "/chat-history";
    if (path === "/analytics") return "/analytics";
    if (path === "/team") return "/team";
    if (path === "/settings") return "/settings";
    return "/";
  });

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  return { navigationItems, activeTab };
};
