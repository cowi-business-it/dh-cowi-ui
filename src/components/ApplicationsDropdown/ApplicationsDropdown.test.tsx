import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApplicationsDropdown } from "./ApplicationsDropdown";
import "@testing-library/jest-dom";

describe("ApplicationsDropdown Properties", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/test" },
      writable: true,
    });
  });

  it("renders application name correctly", () => {
    const apps = [
      {
        applicationName: "Test App",
        linkToApplication: "/test",
      },
    ];

    render(<ApplicationsDropdown applications={apps} />);
    expect(screen.getByText("Test App")).toBeInTheDocument();
  });

  it("renders with icon when provided", () => {
    const apps = [
      {
        applicationName: "Test App",
        icon: '<svg stroke="currentColor">test-icon</svg>',
        linkToApplication: "/test",
      },
    ];

    render(<ApplicationsDropdown applications={apps} />);
    const svgElement = screen.getByText("test-icon", { selector: "svg" });
    expect(svgElement).toBeInTheDocument();
  });

  it("uses default black color when iconColor is not provided", () => {
    const apps = [
      {
        applicationName: "Test App",
        icon: '<svg stroke="currentColor">test-icon</svg>',
        linkToApplication: "/test",
      },
    ];

    render(<ApplicationsDropdown applications={apps} />);
    const svgElement = screen.getByText("test-icon", { selector: "svg" });
    expect(svgElement).toHaveAttribute("stroke", "#000000");
  });

  it("uses provided iconColor when specified", () => {
    const apps = [
      {
        applicationName: "Test App",
        icon: '<svg stroke="currentColor">test-icon</svg>',
        iconColor: "#FF0000",
        linkToApplication: "/test",
      },
    ];

    render(<ApplicationsDropdown applications={apps} />);
    const svgElement = screen.getByText("test-icon", { selector: "svg" });
    expect(svgElement).toHaveAttribute("stroke", "#FF0000");
  });

  it("renders with correct link to application", async () => {
    const apps = [
      {
        applicationName: "Test App",
        linkToApplication: "/test-link",
      },
    ];

    const user = userEvent.setup();
    render(<ApplicationsDropdown applications={apps} />);

    // Open the dropdown menu
    const button = screen.getByRole("button");
    await user.click(button);

    // Check the link in the dropdown menu
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems[0]).toHaveAttribute("href", "/test-link");
  });

  it("handles empty applications array", () => {
    render(<ApplicationsDropdown applications={[]} />);
    expect(screen.getByText("No applications available")).toBeInTheDocument();
  });

  it("sorts applications alphabetically", async () => {
    const apps = [
      {
        applicationName: "Zebra App",
        linkToApplication: "/zebra",
      },
      {
        applicationName: "Alpha App",
        linkToApplication: "/alpha",
      },
    ];

    const user = userEvent.setup();
    render(<ApplicationsDropdown applications={apps} />);

    const button = screen.getByRole("button");
    await user.click(button);

    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems[0]).toHaveTextContent("Alpha App");
    expect(menuItems[1]).toHaveTextContent("Zebra App");
  });
});
