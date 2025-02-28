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
        component: `
        ## TopHeader

        A fixed header component that displays a company logo at the top of the application.

        ### Usage

        \`\`\`tsx
        import { TopHeader } from "./components/TopHeader";

        function App() {
          return (
            <TopHeader
              logo="/assets/images/cowi-logo.png"
              logoAlt="Your Company Logo"
            />
          );
        }
        \`\`\`
        `,
      },
      story: {
        height: "200px",
        width: "100%",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "200px",
          width: "100%",
          backgroundColor: "rgb(229 231 235)",
          position: "relative",
        }}
      >
        <Story />
      </div>
    ),
  ],
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
  },
};

export default meta;
type Story = StoryObj<typeof TopHeader>;

export const Default: Story = {
  args: {
    logo: cowiLogo,
    logoAlt: "COWI Logo",
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
