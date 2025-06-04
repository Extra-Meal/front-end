import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import { Router } from "./router.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={new QueryClient()}>
			<RouterProvider router={Router} />
			{/* React Query Devtools for debugging */}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</StrictMode>
);
