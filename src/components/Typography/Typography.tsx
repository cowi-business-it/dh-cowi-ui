import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../core/utils";

// Title component
export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h1";
    return (
      <Comp
        className={cn(
          "scroll-m-20 text-lg/7 font-medium tracking-tight",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Title.displayName = "Title";


export { Title };
