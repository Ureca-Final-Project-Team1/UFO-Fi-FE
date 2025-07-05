import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button";
import { buttonVariants } from "./buttonVariants";
import type { VariantProps } from "class-variance-authority";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "shadcn/ui 스타일의 기본 Button 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "버튼의 스타일 variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "버튼의 크기",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 상태",
    },
    children: {
      control: "text",
      description: "버튼 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Playground
export const Playground: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

// 모든 Variants
export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ] as ButtonVariant[]
      ).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 기본 버튼 variant들을 보여줍니다.",
      },
    },
  },
};

// 모든 Sizes
export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex gap-4 items-center">
      {(["sm", "default", "lg", "icon"] as ButtonSize[]).map((size) => (
        <Button key={size} size={size}>
          {size === "icon" ? "⭐️" : size}
        </Button>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 버튼 크기를 보여줍니다.",
      },
    },
  },
};

// 아이콘과 함께 사용
export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Item
      </Button>
      <Button variant="outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        Download
      </Button>
      <Button size="icon" variant="ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "아이콘과 함께 사용하는 버튼들입니다.",
      },
    },
  },
};
