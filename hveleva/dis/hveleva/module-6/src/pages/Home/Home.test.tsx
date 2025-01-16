import { render, screen } from "@testing-library/react";
import { it } from "vitest";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../../AppContext";

const queryClient = new QueryClient();

it("Home page is rendered", () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </BrowserRouter>
    </AppProvider>
  );

  const homeText = screen.getByText(/Main table with stocks/i);
  expect(homeText).toBeInTheDocument();
});

it("renders the app successfully", () => {
  render(
    <AppProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </BrowserRouter>
    </AppProvider>
  );

  expect(
    screen.getByText(/Biggest gainers and losers tables/i)
  ).toBeInTheDocument();
});
