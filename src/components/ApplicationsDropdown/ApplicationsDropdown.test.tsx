import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApplicationsDropdown } from "./ApplicationsDropdown";
import "@testing-library/jest-dom";

const mockApplications = [
  {
    applicationName: "Project Admin",
    icon: "<svg>icon1</svg>",
    linkToApplication: "/project-admin",
  },
  {
    applicationName: "Product Overview",
    icon: "<svg>icon2</svg>",
    linkToApplication: "/product-overview",
  },
];

describe("ApplicationsDropdown", () => {
  it("renders with default selected application", () => {
    render(<ApplicationsDropdown applications={mockApplications} />);
    const defaultApp = screen.getByRole("button");
    expect(defaultApp).toHaveTextContent("Project Admin");
  });

  it("shows all applications when clicked", async () => {
    const user = userEvent.setup();
    render(<ApplicationsDropdown applications={mockApplications} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    // After clicking, both options should be visible
    expect(
      screen.getByRole("menuitem", { name: /project admin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: /product overview/i })
    ).toBeInTheDocument();
  });

  it("handles empty string values", () => {
    const appsWithEmptyStrings = [
      {
        applicationName: "App 1",
        icon: "",
        linkToApplication: "/app1",
      },
    ];
    render(<ApplicationsDropdown applications={appsWithEmptyStrings} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("App 1");
  });
});
