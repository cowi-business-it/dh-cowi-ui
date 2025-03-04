import type { Meta, StoryObj } from "@storybook/react";
import { ProjectSelector } from "./ProjectSelector";

const meta: Meta<typeof ProjectSelector> = {
  title: "Components/ProjectSelector",
  component: ProjectSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onSelect: { action: "onSelect" },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectSelector>;

export const Default: Story = {
  args: {
    children: "Default ProjectSelector",
  },
};


