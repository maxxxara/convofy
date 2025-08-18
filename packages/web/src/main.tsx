import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { queryClient, trpc, trpcClient } from "./utils/trpc.ts";
import { Toaster } from "sonner";

function AppWithProviders() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <App />
      <Toaster position="top-right" duration={1500} />
    </trpc.Provider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>
);
