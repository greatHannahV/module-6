import { render, screen } from "@testing-library/react";
import Watchlist from "../../pages/Watchlist/Watchlist";
import { vi } from "vitest";

vi.mock("../../components/Navigation/Navigation", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-navigation">Navigation</div>,
}));

vi.mock("../../components/WatchlistContent/WatchlistContent", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-watchlist-content">WatchlistContent</div>
  ),
}));

describe("Watchlist Component", () => {
  it("should render Navigation and WatchlistContent components", () => {
    render(<Watchlist />);

    expect(screen.getByTestId("mock-navigation")).toBeInTheDocument();

    expect(screen.getByTestId("mock-watchlist-content")).toBeInTheDocument();
  });
});
