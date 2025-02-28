import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ApplicationSpecificMenu } from "./ApplicationSpecificMenu";
import "@testing-library/jest-dom";

const mockMenuItems = [
  {
    name: "Project Info",
    icon: "<svg>icon1</svg>",
    link: "/project/info",
  },
  {
    name: "Members",
    icon: "<svg>icon2</svg>",
    link: "/project/members",
  },
];

describe("ApplicationSpecificMenu", () => {
  it("renders menu items correctly", () => {
    render(<ApplicationSpecificMenu menuItems={mockMenuItems} />);

    const projectInfo = screen.getByRole("link", { name: /project info/i });
    const members = screen.getByRole("link", { name: /members/i });

    expect(projectInfo).toBeInTheDocument();
    expect(members).toBeInTheDocument();
  });

  it("renders correct number of links", () => {
    render(<ApplicationSpecificMenu menuItems={mockMenuItems} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });

  it("renders links with correct hrefs", () => {
    render(<ApplicationSpecificMenu menuItems={mockMenuItems} />);

    const projectInfoLink = screen.getByRole("link", { name: /project info/i });
    const membersLink = screen.getByRole("link", { name: /members/i });

    expect(projectInfoLink).toHaveAttribute("href", "/project/info");
    expect(membersLink).toHaveAttribute("href", "/project/members");
  });

  it("shows no menu items message when empty array provided", () => {
    render(<ApplicationSpecificMenu menuItems={[]} />);

    expect(screen.getByText("No menu items available")).toBeInTheDocument();
  });

  it("handles menu items without icons", () => {
    const itemsWithoutIcons = [
      {
        name: "Project Info",
        link: "/project/info",
      },
    ];
    render(<ApplicationSpecificMenu menuItems={itemsWithoutIcons} />);

    const link = screen.getByRole("link", { name: /project info/i });
    expect(link).toBeInTheDocument();
  });
});
