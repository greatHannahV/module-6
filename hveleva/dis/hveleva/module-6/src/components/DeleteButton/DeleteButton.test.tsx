import { describe, vi, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AppContext } from "../../AppContext";
import DeleteButton from "./DeleteButton";

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
    regularMarketChange: -2.55,
    regularMarketChangePercent: -1.35,
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
  isLoading: false,
};

describe("DeleteButton component works correctly", () => {
  it("should call removeBookmark function on button click", async () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={mockContextValue}>
          <QueryClientProvider client={queryClient}>
            <DeleteButton stock={mockStocks[0]} />
          </QueryClientProvider>
        </AppContext.Provider>
      </MemoryRouter>
    );

    const button = screen.getByTestId("delete-button-container");
    await userEvent.click(button);

    expect(setBookedStocks).toHaveBeenCalledTimes(1);
  });
});
