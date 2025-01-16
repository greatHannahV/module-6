import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import userEvent from "@testing-library/user-event";
import { Button } from "./SearchBarResult.style";
import SearchBarResult from "./SearchBarResult";
import { AppContext } from "../../AppContext";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockSetSearch = vi.fn();
const mockSetBookedStocks = vi.fn();
const mockSetStocks = vi.fn();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("SearchBarResult works correctly", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });
  beforeEach(() => {
    vi.resetModules();
  });

  it("the button should be clicked", async () => {
    const bookedStocks = [{ shortName: "Apple" }];
    const stock = {
      shortName: "Apple",
      symbol: "AAPL",
      regularMarketChange: 1.23,
      regularMarketChangePercent: 2.34,
    };

    const handleBookmarkToggle = vi.fn();
    render(
      <Button data-testid="button" onClick={() => handleBookmarkToggle(stock)}>
        {bookedStocks.some((s) => s.shortName === stock.shortName) ? (
          <IoBookmark />
        ) : (
          <IoBookmarkOutline />
        )}
      </Button>
    );

    const button = screen.getByTestId("button");

    await userEvent.click(button);

    expect(handleBookmarkToggle).toHaveBeenCalledWith(stock);
  });

  it("the clear button should be rendered", async () => {
    const mockContextValue = {
      search: "Tesla",
      bookedStocks: [],
      setSearch: mockSetSearch,
      stocks: [],
      setStocks: mockSetStocks,
      setBookedStocks: mockSetBookedStocks,
      isLoading: false,
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockContextValue}>
          <QueryClientProvider client={queryClient}>
            <SearchBarResult />
          </QueryClientProvider>
        </AppContext.Provider>
      </MemoryRouter>
    );

    const clearButton = screen.getByTestId("clear-button");

    expect(clearButton).toBeInTheDocument();
    userEvent.click(clearButton);

    await waitFor(() => {
      expect(mockSetSearch).toHaveBeenCalledTimes(1);
      expect(mockSetSearch).toHaveBeenCalledWith("");
    });
  });

  it("Search is empty", () => {
    const mockContextValue = {
      search: "",
      bookedStocks: [],
      setSearch: mockSetSearch,
      stocks: [],
      setStocks: mockSetStocks,
      setBookedStocks: mockSetBookedStocks,
      isLoading: false,
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockContextValue}>
          <QueryClientProvider client={queryClient}>
            <SearchBarResult />
          </QueryClientProvider>
        </AppContext.Provider>
      </MemoryRouter>
    );

    const noStocksMessage = screen.queryByText(/No matching stocks found./i);
    expect(noStocksMessage).not.toBeInTheDocument();
  });

  it("Data renders for stocks", () => {
    const mockContextValue = {
      search: "Apple",
      bookedStocks: [],
      setSearch: mockSetSearch,
      stocks: [
        {
          shortName: "Apple",
          symbol: "AAPL",
          regularMarketChange: 1.23,
          regularMarketChangePercent: 2.34,
          currency: "USD",
          exchangeName: "NASDAQ",
          fullExchangeName: "NASDAQ Stock Market",
          instrumentType: "EQUITY",
        },
      ],
      setStocks: mockSetStocks,
      setBookedStocks: mockSetBookedStocks,
      isLoading: false,
    };

    render(
      <MemoryRouter>
        <AppContext.Provider value={mockContextValue}>
          <QueryClientProvider client={queryClient}>
            <SearchBarResult />
          </QueryClientProvider>
        </AppContext.Provider>
      </MemoryRouter>
    );

    const stockName = screen.getByText(/Apple/i);
    const stockSymbol = screen.getByText("AAPL");
    const marketChange = screen.getByText("1.23");
    const marketChangePercent = screen.getByText("2.34");

    expect(stockName).toBeInTheDocument();
    expect(stockSymbol).toBeInTheDocument();
    expect(marketChange).toBeInTheDocument();
    expect(marketChangePercent).toBeInTheDocument();
  });
});
