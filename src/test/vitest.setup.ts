import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Add to global context
window.ResizeObserver = ResizeObserver;
global.ResizeObserver = ResizeObserver;

Element.prototype.scrollIntoView = vi.fn();

// Run cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
