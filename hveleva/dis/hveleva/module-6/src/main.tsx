// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import router from "./mainRouter.js";
import "./styles/index.css";
import { AppProvider } from "./AppContext.js";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </AppProvider>
  </QueryClientProvider>
  // </StrictMode>
);
