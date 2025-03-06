import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectSelector } from "./ProjectSelector";

const mockProjects = [
  {
    value: "A123456",
    label: "A123456 - Office Building Alpha",
  },
  {
    value: "D991807",
    label: "D991807 - Bispebjerg Hospital",
  },
  {
    value: "A882886",
    label: "A882886 - New hospital",
  },
  {
    value: "B123456",
    label: "B123456 - Office Building Beta",
  },
  {
    value: "G123456",
    label: "G123456 - Office Building Gamma",
  },
];

describe("ProjectSelector", () => {
  it("renders with default text and folder icon", () => {
    render(<ProjectSelector projects={mockProjects} />);

    expect(screen.getByText("Select a project...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens popover when button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProjectSelector projects={mockProjects} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(
      screen.getByPlaceholderText("Search projects by name or number...")
    ).toBeInTheDocument();
  });

  it("displays items in alphabetical order", async () => {
    const user = userEvent.setup();
    render(<ProjectSelector projects={mockProjects} />);

    await user.click(screen.getByRole("button"));

    const items = screen.getAllByRole("option");

    const itemTexts = items.map((item) => item.textContent);

    const sortedTexts = [...itemTexts].sort();

    expect(itemTexts).toEqual(sortedTexts);

    expect(itemTexts).toEqual([
      "A123456 - Office Building Alpha",
      "A882886 - New hospital",
      "B123456 - Office Building Beta",
      "D991807 - Bispebjerg Hospital",
      "G123456 - Office Building Gamma",
    ]);
  });

  it("supports fuzzy search with repeated characters", async () => {
    const user = userEvent.setup();
    render(<ProjectSelector projects={mockProjects} />);

    await user.click(screen.getByRole("button"));

    // Get the search input and type 'offff'
    const searchInput = screen.getByPlaceholderText(
      "Search projects by name or number..."
    );
    await user.type(searchInput, "offff");

    // Should find items containing "office"
    const items = screen.getAllByRole("option");
    expect(items).toHaveLength(3); // Should find all office buildings

    // Verify the specific matches
    const itemTexts = items.map((item) => item.textContent);
    expect(itemTexts).toContain("A123456 - Office Building Alpha");
    expect(itemTexts).toContain("B123456 - Office Building Beta");
    expect(itemTexts).toContain("G123456 - Office Building Gamma");

    // Verify the first non-matching item is not present
    expect(
      screen.queryByText("D991807 - Bispebjerg Hospital")
    ).not.toBeInTheDocument();
  });
});
