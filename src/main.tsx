import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import Chat from "./components/ai/chat.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ThemeProvider } from "./contexts/themeContext.tsx";
import "./index.css";
import { Router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={Router} />
            <Chat />
            <Toaster position="top-center" richColors />
            {/* React Query Devtools for debugging */}
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
