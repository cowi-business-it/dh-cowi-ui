import type { Meta, StoryObj } from "@storybook/react";
import { ApplicationSpecificMenu } from "./ApplicationSpecificMenu";

const meta: Meta<typeof ApplicationSpecificMenu> = {
  title: "Components/ApplicationSpecificMenu",
  component: ApplicationSpecificMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ApplicationSpecificMenu>;

const mockMenuItems = [
  {
    name: "Project Info",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`,
    link: "/project/info",
  },
  {
    name: "Members",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    link: "/project/members",
  },
  {
    name: "Companies",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    link: "/project/companies",
  },
  {
    name: "Documents",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    link: "/project/documents",
  },
];

export const Default: Story = {
  args: {
    menuItems: mockMenuItems,
  },
};

export const NoIcons: Story = {
  args: {
    menuItems: mockMenuItems.map(({ icon, ...item }) => item),
  },
};

export const SingleItem: Story = {
  args: {
    menuItems: [mockMenuItems[0]],
  },
};

export const EmptyMenu: Story = {
  args: {
    menuItems: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a "No menu items available" message when the menuItems array is empty.',
      },
    },
  },
};
