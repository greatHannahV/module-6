import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Search from "./Search";
import { AppProvider } from "../../AppContext";

vi.mock("../SearchBarResult/SearchBarResult", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-searchBarResult">SearchBarResult</div>,
}));

describe("Search Component", () => {
  it("should render components", () => {
    render(
      <AppProvider>
        <Search />
      </AppProvider>
    );

    expect(screen.getByTestId("mock-searchBarResult")).toBeInTheDocument();

    const input = screen.getByTestId("search-input");
    expect(input).toBeInTheDocument();
  });
});
