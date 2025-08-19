import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/utils/Sidebar";

import { Dashboard } from "./pages/Dashboard";
import { BotsManager } from "./pages/BotsManager";
import { BotSettings } from "./pages/BotSettings";
import { KnowledgeBase } from "./pages/KnowledgeBase";
import { KnowledgeUpload } from "./pages/KnowledgeUpload";
import { ChatHistory } from "./pages/ChatHistory";
import { Analytics } from "./pages/Analytics";
import { TeamManager } from "./pages/TeamManager";
import { ProjectSettings } from "./pages/ProjectSettings";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import ProtectedRoute from "./components/utils/ProtectedRouter";
import PublicRoute from "./components/utils/PublicRouter";

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
            <ProtectedRoute>
              <SidebarLayout>
                <Dashboard />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bots"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <BotsManager />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bots/settings/:botId?"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <BotSettings />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/knowledge"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <KnowledgeBase />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/knowledge/upload"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <KnowledgeUpload />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat-history"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <ChatHistory />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <Analytics />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <TeamManager />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SidebarLayout>
                <ProjectSettings />
              </SidebarLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
