import type { Meta, StoryObj } from "@storybook/react";
import { ProjectProps, ProjectSelector } from "./ProjectSelector";

const mockProjects: ProjectProps[] = [
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
    label:
      "A882886 - New hospital Alpha beta gamma delta epsilon zeta eta theta iota kappa lambda mu nu xi omicron pi rho sigma tau upsilon phi chi psi omega",
  },
  {
    value: "B123456",
    label: "B123456 - Office Building Beta",
  },
  {
    value: "G123456",
    label: "G123456 - Office Building Gama",
  },
  {
    value: "M446466",
    label: "M446466 - Office Building Gama",
  },
];

const meta: Meta<typeof ProjectSelector> = {
  title: "Components/ProjectSelector",
  component: ProjectSelector,
  decorators: [
    (Story) => (
      <div className="bg-white p-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onProjectSelect: {
      action: "onProjectSelect",
      description: "Callback fired when a project is selected",
    },
    projects: {
      description: "Array of projects to display",
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectSelector>;

export const Default: Story = {
  args: {
    projects: mockProjects,
    onProjectSelect: (projectId: string) =>
      console.log("Selected project:", projectId),
  },
};

export const EmptyProjects: Story = {
  args: {
    projects: [],
    onProjectSelect: (projectId: string) =>
      console.log("Selected project:", projectId),
  },
};
