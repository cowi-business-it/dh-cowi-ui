import type { Meta, StoryObj } from "@storybook/react";
import { TopHeader } from "./TopHeader";
import cowiLogo from "../../assets/images/cowi-logo.svg";

const meta: Meta<typeof TopHeader> = {
  title: "Components/TopHeader",
  component: TopHeader,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        component: "A fixed header component that displays a company logo.",
      },
      story: {
        height: "100px",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    logo: {
      control: "text",
      description: "Path to the logo image from your assets folder",
    },
    logoAlt: {
      control: "text",
      description: "Alt text for the logo",
    },
    landingPageUrl: {
      control: "text",
      description: "URL to navigate to when logo is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopHeader>;

export const Default: Story = {
  args: {
    logo: cowiLogo,
    logoAlt: "COWI Logo",
    landingPageUrl: "/",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic header with company logo. Logo should be placed in your project's assets folder.",
      },
    },
  },
};
