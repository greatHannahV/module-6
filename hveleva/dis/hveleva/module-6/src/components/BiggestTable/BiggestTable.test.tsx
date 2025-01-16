import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BiggestTable from "./BiggestTable";
import mockStocks from "../../services/__mock__/mockStocks.json";
import "@testing-library/jest-dom";
import { getBiggestGainersAndLosers } from "../../utils/getBiggestGainersAndLosers";

describe("Biggest gainers and losers are shown correctly", () => {
  it("Biggest gainers are shown correctly", () => {
    render(
      <BiggestTable
        type="gainers"
        isLoading={false}
        uniqueStocks={mockStocks}
      />
    );
    const textElement = screen.getByText(/Biggest Gainers/i);
    expect(textElement).toBeInTheDocument();
  });
  it("Biggest losers are shown correctly", () => {
    render(
      <BiggestTable type="losers" isLoading={false} uniqueStocks={mockStocks} />
    );
    const textElement = screen.getByText(/Biggest losers/i);
    expect(textElement).toBeInTheDocument();
  });
});

describe("Biggest gainers and losers are ordered correctly", () => {
  it("should correctly calculate biggest gainers", () => {
    const { biggestGainers } = getBiggestGainersAndLosers(mockStocks);

    expect(biggestGainers).toHaveLength(5);

    expect(biggestGainers[0].company.symbol).toBe("AMZN");
    expect(biggestGainers[1].company.symbol).toBe("GOOG");
  });

  it("should correctly calculate biggest losers", () => {
    const { biggestLosers } = getBiggestGainersAndLosers(mockStocks);

    expect(biggestLosers).toHaveLength(5);

    expect(biggestLosers[0].company.symbol).toBe("TSM");
    expect(biggestLosers[1].company.symbol).toBe("WMT");
  });
});
