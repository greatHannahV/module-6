import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import Chart from "./Chart.tsx";
import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, describe, it, vi } from "vitest";
import "../../services/__mock__/matchMedia.ts";
import { handlers } from "../../services/__mock__/handlers.ts";
import { setupServer } from "msw/node";
import "vitest-canvas-mock";

const server = setupServer(...handlers);

const hoistedMocks = vi.hoisted(() => {
  return {
    useParams: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: hoistedMocks.useParams,
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderChart = (symbol: string) => {
  hoistedMocks.useParams.mockReturnValue({ symbol });

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Chart />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("Chart Component", () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    server.listen();
  });

  afterEach(() => {
    cleanup(); // cleanup the render
    hoistedMocks.useParams.mockClear(); // clear the mock

    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  it("should display SkeletonCharts when isLoading is true", async () => {
    renderChart("AAPL");

    const skeleton = screen.getByTestId("skeleton-charts");
    expect(skeleton).toBeInTheDocument();
  });

  it("should display chart data when data is successfully fetched", async () => {
    renderChart("AAPL");

    await waitFor(async () => {
      const chartContainer = await screen.findByTestId("chart-container");
      expect(chartContainer).toBeInTheDocument();
    });
  });

  it("should display error state when there is an error", async () => {
    renderChart("FORBIDDEN");

    await waitFor(async () => {
      const errorMessage = await screen.findByText(/There is the error/i);
      expect(errorMessage).toBeInTheDocument();

      const errorContainer = await screen.findByTestId("error-container");
      expect(errorContainer).toBeInTheDocument();
    });
  });

  it("If the symbol is equal to NOTFOUND", async () => {
    renderChart("NOTFOUND");

    await waitFor(async () => {
      const errorMessage = await screen.findByText(
        /No valid data found for the given ticker/i
      );
      expect(errorMessage).toBeInTheDocument();

      const errorContainer = await screen.findByTestId("error-container");
      expect(errorContainer).toBeInTheDocument();
    });
  });
});
