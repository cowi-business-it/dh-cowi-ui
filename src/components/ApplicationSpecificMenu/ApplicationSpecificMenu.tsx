import * as React from "react";
import { cn } from "../../core/utils";

interface MenuItem {
  name: string;
  icon?: string;
  link: string;
}

const SVGIcon: React.FC<{ svgString?: string }> = ({ svgString }) => {
  if (!svgString) return null;
  return <span dangerouslySetInnerHTML={{ __html: svgString }} />;
};

interface ApplicationSpecificMenuProps {
  menuItems: MenuItem[];
}

const ApplicationSpecificMenu = React.forwardRef<
  HTMLDivElement,
  ApplicationSpecificMenuProps
>(({ menuItems }, ref) => {
  if (!menuItems?.length) {
    return (
      <div ref={ref} className="w-64 overflow-hidden">
        <div className="flex items-center gap-2 p-3 text-gray-400">
          <span className="text-sm">No menu items available</span>
        </div>
      </div>
    );
  }
  return (
    <div ref={ref} className="w-64 overflow-hidden">
      {menuItems.map((item) => (
        <a
          key={item.link}
          href={item.link}
          className={cn(
            "flex items-center gap-2 p-3 hover:bg-gray-100",
            "text-sm",
            "transition-colors duration-200"
          )}
        >
          {item.icon && <SVGIcon svgString={item.icon} />}
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
});

ApplicationSpecificMenu.displayName = "ApplicationSpecificMenu";

export {
  ApplicationSpecificMenu,
  type MenuItem,
  type ApplicationSpecificMenuProps,
};
