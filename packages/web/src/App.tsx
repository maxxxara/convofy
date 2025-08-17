import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/utils/Sidebar";

import { Dashboard } from "./pages/Dashboard";
import { BotsManager } from "./pages/BotsManager";
import { BotSettings } from "./pages/BotSettings";
import { BotPublication } from "./pages/BotPublication";
import { KnowledgeBase } from "./pages/KnowledgeBase";
import { KnowledgeUpload } from "./pages/KnowledgeUpload";
import { ChatHistory } from "./pages/ChatHistory";
import { Analytics } from "./pages/Analytics";
import { TeamManager } from "./pages/TeamManager";
import { ProjectSettings } from "./pages/ProjectSettings";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          }
        />
        <Route
          path="/bots"
          element={
            <SidebarLayout>
              <BotsManager />
            </SidebarLayout>
          }
        />
        <Route
          path="/bots/settings/:botId?"
          element={
            <SidebarLayout>
              <BotSettings />
            </SidebarLayout>
          }
        />
        <Route
          path="/bots/publication/:botId?"
          element={
            <SidebarLayout>
              <BotPublication />
            </SidebarLayout>
          }
        />
        <Route
          path="/knowledge"
          element={
            <SidebarLayout>
              <KnowledgeBase />
            </SidebarLayout>
          }
        />
        <Route
          path="/knowledge/upload"
          element={
            <SidebarLayout>
              <KnowledgeUpload />
            </SidebarLayout>
          }
        />
        <Route
          path="/chat-history"
          element={
            <SidebarLayout>
              <ChatHistory />
            </SidebarLayout>
          }
        />
        <Route
          path="/analytics"
          element={
            <SidebarLayout>
              <Analytics />
            </SidebarLayout>
          }
        />
        <Route
          path="/team"
          element={
            <SidebarLayout>
              <TeamManager />
            </SidebarLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <SidebarLayout>
              <ProjectSettings />
            </SidebarLayout>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
