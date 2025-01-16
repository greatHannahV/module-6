import { beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { useAppContext } from "../../AppContext";
import { Button } from "./SearchBarResult.style";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import userEvent from "@testing-library/user-event";
import { Meta } from "../../services/StockServices.types";

describe("SearchBarResult component tests", () => {
  beforeEach(() => {
    vi.mock("../../AppContext", async () => {
      const actual = await vi.importActual("../../AppContext");
      return {
        ...actual,
        useState: vi.fn(),
        useAppContext: () => ({
          search: "AAPL",
          setSearch: vi.fn(),
          stocks: [],
          setStocks: vi.fn(),
          filteredStocks: [
            {
              shortName: "Apple",
              symbol: "AAPL",
              regularMarketChange: 1.23,
              regularMarketChangePercent: 2.34,
              currency: "USD",
              exchangeName: "NASDAQ",
              fullExchangeName: "NASDAQ Stock Market",
              instrumentType: "Stock",
            },
          ],
          setFilteredStocks: vi.fn(),
          bookedStocks: [
            {
              shortName: "Apple",
              symbol: "AAPL",
              regularMarketChange: 1.23,
              regularMarketChangePercent: 2.34,
              currency: "USD",
              exchangeName: "NASDAQ",
              fullExchangeName: "NASDAQ Stock Market",
              instrumentType: "Stock",
            },
          ],
          setBookedStocks: vi.fn(),
        }),
      };
    });
  });

  const stock: Meta = {
    shortName: "Apple",
    symbol: "AAPL",
    regularMarketChange: 1.23,
    regularMarketChangePercent: 2.34,
    currency: "USD",
    exchangeName: "NASDAQ",
    fullExchangeName: "NASDAQ Stock Market",
    instrumentType: "Stock",
  };

  it("should add a bookmark", async () => {
    const { setBookedStocks, bookedStocks } = useAppContext();

    render(
      <Button
        data-testid="button"
        onClick={() => {
          setBookedStocks([stock]);
        }}
      >
        {bookedStocks.some((s) => s.shortName === "Apple") ? (
          <IoBookmark data-testid="add-bookmark-button" />
        ) : (
          <IoBookmarkOutline data-testid="remove-bookmark-button" />
        )}
      </Button>
    );
    setBookedStocks([
      {
        shortName: "Apple",
        symbol: "AAPL",
        regularMarketChange: 1.23,
        regularMarketChangePercent: 2.34,
        currency: "USD",
        exchangeName: "NASDAQ",
        fullExchangeName: "NASDAQ Stock Market",
        instrumentType: "Stock",
      },
    ]);

    const button = screen.queryByTestId("button");

    if (button) {
      await userEvent.click(button);
    } else {
      throw new Error("Button not found");
    }

    await userEvent.click(button);

    await waitFor(() => {
      expect(setBookedStocks).toHaveBeenCalledWith([stock]);
    });

    await waitFor(() => {
      const addButton = screen.queryByTestId("add-bookmark-button");
      expect(addButton).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(bookedStocks).toEqual([stock]);
    });
  });

  it("should remove a bookmark", async () => {
    const { setBookedStocks, bookedStocks } = useAppContext();
    render(
      <Button
        data-testid="button"
        onClick={() => {
          setBookedStocks([]);
        }}
      >
        {bookedStocks.some((s) => s.shortName !== "Apple") ? (
          <IoBookmark data-testid="add-bookmark-button" />
        ) : (
          <IoBookmarkOutline data-testid="remove-bookmark-button" />
        )}
      </Button>
    );
    setBookedStocks([]);

    const button = screen.queryByTestId("button");

    if (button) {
      await userEvent.click(button);
    } else {
      throw new Error("Button not found");
    }

    await userEvent.click(button);

    await waitFor(() => {
      expect(setBookedStocks).toHaveBeenCalledWith([]);
    });

    await waitFor(() => {
      const removeButton = screen.queryByTestId("remove-bookmark-button");
      expect(removeButton).toBeInTheDocument();
    });
  });
});
