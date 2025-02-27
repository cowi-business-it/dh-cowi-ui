import type { Meta, StoryObj } from "@storybook/react";
import { Title, Subtitle } from "./Typography";

// Title stories
const titleMeta: Meta<typeof Title> = {
  title: "Components/Typography/Title",
  component: Title,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    asChild: {
      control: "boolean",
      description: "Whether to render as a child element",
    },
    className: {
      control: "text",
      description: "Additional CSS class names",
    },
  },
};

export default titleMeta;
type TitleStory = StoryObj<typeof Title>;

export const Default: TitleStory = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const WithCustomClass: TitleStory = {
  args: {
    children: "Custom styled title",
    className: "text-blue-500 italic",
  },
};

export const AsChild: TitleStory = {
  render: () => (
    <Title asChild>
      <a href="#" onClick={(e) => e.preventDefault()}>Clickable Title</a>
    </Title>
  ),
};
