import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../core/utils";

interface Application {
  applicationName: string;
  icon?: string;
  linkToApplication: string;
}

const SVGIcon: React.FC<{ svgString?: string }> = ({ svgString }) => {
  if (!svgString) return null;
  return <span dangerouslySetInnerHTML={{ __html: svgString }} />;
};

interface ApplicationsDropdownProps {
  applications: Application[];
  // defaultSelected?: number;
}

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className="relative w-3 h-3">
      {isOpen ? (
        // Downward chevron
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path
            d="M2.25 4.5L6 8.25L9.75 4.5"
            fill="none"
            stroke="#9ca3af" //gray-400
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Right chevron
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path
            d="M4.5 2.25L8.25 6L4.5 9.75"
            fill="none"
            stroke="#9ca3af" //gray-400
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

const ApplicationsDropdown = React.forwardRef<
  HTMLDivElement,
  ApplicationsDropdownProps
>(({ applications }) => {
  // Get current path to determine selected application
  const currentPath = window.location.pathname;

  // Find index of current application based on URL
  const getCurrentAppIndex = () => {
    const index = applications.findIndex((app) =>
      currentPath.startsWith(app.linkToApplication)
    );
    return index >= 0 ? index : 0; // Default to first if not found
  };
  const [selectedIndex, setSelectedIndex] = React.useState(
    getCurrentAppIndex()
  );
  const [isOpen, setIsOpen] = React.useState(false);

  if (applications.length === 0) {
    return (
      <div className="flex items-center text-sm bg-white border border-gray-200 w-64 gap-2 p-3">
        <span className="text-sm font-semibold">No applications available</span>
      </div>
    );
  }
  const normalizedApps = applications.map((app) => ({
    applicationName: app.applicationName || "",
    icon: app.icon || "",
    linkToApplication: app.linkToApplication || "",
  }));

  const selectedApp = normalizedApps[selectedIndex];

  return (
    <DropdownMenuPrimitive.DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuPrimitive.DropdownMenuTrigger className="flex items-center bg-white border border-gray-200 w-64 gap-2 p-3 focus:bg-gray focus:outline-none">
        <div className="flex items-center gap-2">
          {selectedApp.icon && <SVGIcon svgString={selectedApp.icon} />}
          <span className="text-sm">{selectedApp.applicationName}</span>
        </div>
        <ChevronIcon isOpen={isOpen} />
      </DropdownMenuPrimitive.DropdownMenuTrigger>
      <DropdownMenuPrimitive.DropdownMenuContent
        className={cn(
          "z-50 w-[250px] overflow-hidden border border-gray-200 rounded-md bg-popover mt-2 mb-4",
          "shadow-lg"
        )}
      >
        {applications.map((app, index) => (
          <DropdownMenuPrimitive.DropdownMenuItem
            key={app.linkToApplication}
            className={cn(
              "cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 last:border-b-0 focus:outline-none",
              selectedIndex === index && "bg-gray-200"
            )}
            asChild
          >
            <a
              href={app.linkToApplication}
              className="flex items-center gap-2 p-3"
              onClick={() => setSelectedIndex(index)}
            >
              {app.icon && <SVGIcon svgString={app.icon} />}
              <span className="text-sm">{app.applicationName}</span>
            </a>
          </DropdownMenuPrimitive.DropdownMenuItem>
        ))}
      </DropdownMenuPrimitive.DropdownMenuContent>
    </DropdownMenuPrimitive.DropdownMenu>
  );
});

ApplicationsDropdown.displayName = "ApplicationsDropdown";

export {
  ApplicationsDropdown as ApplicationsDropdown,
  type Application,
  type ApplicationsDropdownProps as ApplicationsDropdownProps,
};
