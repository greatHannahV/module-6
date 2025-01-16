import { render, screen } from "@testing-library/react";
import WatchlistContentHeader from "./WatchlistContentHeader";
import { AppProvider } from "../../AppContext";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

it("Should render header's text", () => {
  render(
    <AppProvider>
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <WatchlistContentHeader />
        </QueryClientProvider>
      </MemoryRouter>
    </AppProvider>
  );
  const name = screen.getByText("Name");
  expect(name).toBeInTheDocument();
  const price = screen.getByText("Price");
  expect(price).toBeInTheDocument();
  const change = screen.getByText("Change");
  expect(change).toBeInTheDocument();
});
