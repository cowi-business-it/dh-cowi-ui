import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "../../core/utils";

interface Application {
  applicationName: string;
  icon?: string;
  iconColor?: string; // Added color prop
  linkToApplication: string;
}

const SVGIcon: React.FC<{ svgString?: string; color?: string }> = ({
  svgString,
  color,
}) => {
  if (!svgString) return null;
  const coloredSvg = color
    ? svgString.replace(/stroke="currentColor"/, `stroke="${color}"`)
    : svgString;
  return <span dangerouslySetInnerHTML={{ __html: coloredSvg }} />;
};

interface ApplicationsDropdownProps {
  applications: Application[];
}

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className="relative w-3 h-3">
      {isOpen ? (
        <ChevronDown className="w-3 h-3 text-gray-400" />
      ) : (
        <ChevronRight className="w-3 h-3 text-gray-400" />
      )}
    </div>
  );
};

const ApplicationsDropdown: React.FC<ApplicationsDropdownProps> = ({
  applications,
}) => {
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
        <span className="text-sm">No applications available</span>
      </div>
    );
  }
  const normalizedApps = applications
    .map((app) => ({
      applicationName: app.applicationName || "",
      icon: app.icon || "",
      iconColor: app.iconColor || "#000000",
      linkToApplication: app.linkToApplication || "",
    }))
    .sort((a, b) => a.applicationName.localeCompare(b.applicationName));

  const selectedApp = normalizedApps[selectedIndex];

  return (
    <DropdownMenuPrimitive.DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuPrimitive.DropdownMenuTrigger className="flex items-center bg-white border border-gray-200 w-64 gap-2 p-3 focus:bg-gray focus:outline-none">
        <div className="flex items-center gap-2">
          {selectedApp.icon && (
            <SVGIcon
              svgString={selectedApp.icon}
              color={selectedApp.iconColor}
            />
          )}
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
        {normalizedApps.map((app, index) => (
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
              {app.icon && (
                <SVGIcon svgString={app.icon} color={app.iconColor} />
              )}{" "}
              <span className="text-sm">{app.applicationName}</span>
            </a>
          </DropdownMenuPrimitive.DropdownMenuItem>
        ))}
      </DropdownMenuPrimitive.DropdownMenuContent>
    </DropdownMenuPrimitive.DropdownMenu>
  );
};

ApplicationsDropdown.displayName = "ApplicationsDropdown";

export { ApplicationsDropdown };
export type { Application, ApplicationsDropdownProps };
