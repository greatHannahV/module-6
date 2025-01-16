import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "./src/services/__mock__/matchMedia";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
