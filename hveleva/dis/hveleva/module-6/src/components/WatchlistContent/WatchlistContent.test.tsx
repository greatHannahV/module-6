import { setupServer } from "msw/node";
import {
  describe,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import { handlers } from "../../services/__mock__/handlers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WatchlistContent from "./WatchlistContent";
import { AppContext } from "../../AppContext";

const server = setupServer(...handlers);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockStocks = [
  {
    shortName: "Apple",
    symbol: "AAPL",
    regularMarketChange: 2.55,
    regularMarketChangePercent: 1.35,
    currency: "USD",
    exchangeName: "NASDAQ",
    fullExchangeName: "NASDAQ Stock Market",
    instrumentType: "EQUITY",
  },
  {
    shortName: "Tesla",
    symbol: "TSLA",
    regularMarketChange: 1.25,
    regularMarketChangePercent: 3.8,
    currency: "USD",
    exchangeName: "NASDAQ",
    fullExchangeName: "NASDAQ Stock Market",
    instrumentType: "EQUITY",
  },
];

const setBookedStocks = vi.fn();
const setFilteredStocks = vi.fn();
const mockSetStocks = vi.fn();
const mockSetSearch = vi.fn();

const mockContextValue = {
  bookedStocks: mockStocks,
  setBookedStocks: setBookedStocks,
  setFilteredStocks: setFilteredStocks,
  stocks: [],
  setStocks: mockSetStocks,
  filteredStocks: [],
  search: "",
  setSearch: mockSetSearch,
  isLoading: true,
};

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  server.listen();
});

afterAll(() => server.close());

beforeEach(() => {
  render(
    <MemoryRouter>
      <AppContext.Provider value={mockContextValue}>
        <QueryClientProvider client={queryClient}>
          <WatchlistContent />
        </QueryClientProvider>
      </AppContext.Provider>
    </MemoryRouter>
  );
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
  queryClient.clear();
});

describe("WatchlistContent component works correctly", () => {
  it("should display SkeletonWatchlist when isLoading is true", async () => {
    const skeleton = await screen.findByTestId("watchlist-charts");
    expect(skeleton).toBeInTheDocument();
  });

  it("should render booked stocks correctly when isLoading is false", async () => {
    mockContextValue.isLoading = false;

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockContextValue}>
          <QueryClientProvider client={queryClient}>
            <WatchlistContent />
          </QueryClientProvider>
        </AppContext.Provider>
      </MemoryRouter>
    );

    mockStocks.forEach((stock) => {
      expect(screen.getByText(stock.shortName)).toBeInTheDocument();
      expect(screen.getByText(stock.symbol)).toBeInTheDocument();
      expect(
        screen.getByText(stock.regularMarketChange.toFixed(2))
      ).toBeInTheDocument();
    });
  });

  it("should render the 'Equity Watchlist' header correctly", async () => {
    await waitFor(() => {
      const headerElement = screen.getByText(/Equity Watchlist/i);
      expect(headerElement).toBeInTheDocument();
    });
  });
});
