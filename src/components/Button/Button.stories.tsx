import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Github, Plus } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "The visual style of the button",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "lg", "icon"],
      description: "The size of the button",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Whether to merge props onto the immediate child",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
    size: "default",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Github />
        View on GitHub
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

