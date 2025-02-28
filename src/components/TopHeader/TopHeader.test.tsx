import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopHeader } from "./TopHeader";
import "@testing-library/jest-dom";

describe("TopHeader", () => {
  const mockLogo = "/path/to/mock-logo.svg";

  it("renders with provided logo", () => {
    render(<TopHeader logo={mockLogo} />);
    const logoElement = screen.getByRole("img");
    expect(logoElement).toHaveAttribute("src", mockLogo);
  });
});
