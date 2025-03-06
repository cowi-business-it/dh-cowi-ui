import * as React from "react";
import { Check, ChevronDown, ChevronRight, Folder } from "lucide-react";

import { cn } from "../../core/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface ProjectProps {
  value: string;
  label: string;
}

export interface ProjectSelectorProps {
  projects: ProjectProps[];
  selectedProject?: ProjectProps;
  onProjectSelect?: (value: string) => void;
}

const ProjectSelector = React.forwardRef<
  HTMLButtonElement,
  ProjectSelectorProps
>(({ projects, selectedProject, onProjectSelect }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState(selectedProject?.label ?? "");

  React.useEffect(() => {
    setLabel(selectedProject?.label ?? "");
  }, [selectedProject]);

  const handleSelect = (currentLabel: string) => {
    setLabel(currentLabel);
    setOpen(false);
    const selected = projects.find(
      (project) => project.label === currentLabel
    )?.value;
    if (selected && onProjectSelect) {
      onProjectSelect(selected);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          className="max-w-[350px] flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center truncate">
            <Folder className="mr-2 flex-shrink-0" aria-hidden="true" />
            <span className="flex-1 truncate">
              {label
                ? projects.find((project) => project.label === label)?.label
                : "Select a project..."}
            </span>
          </div>
          {open ? (
            <ChevronRight
              className="opacity-50 ml-2 min-w-[16px] min-h-[16px]"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              className="opacity-50 ml-2 min-w-[16px] min-h-[16px]"
              aria-hidden="true"
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] bg-white border border-gray-100 pl-0 pr-0 pb-0">
        <Command>
          <CommandInput
            placeholder="Search projects by name or number..."
            className="h-9"
          />
          <CommandList className="max-w-[300px] overflow-y-auto">
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((project) => (
                  <CommandItem
                    key={project.value}
                    value={project.label}
                    onSelect={handleSelect}
                    className={cn(
                      "p-2",
                      "cursor-pointer",
                      label === project.label
                        ? "bg-gray-200"
                        : "hover:bg-gray-200 focus:bg-gray-200"
                    )}
                  >
                    <span className="truncate flex-1">{project.label}</span>
                    <Check
                      className={cn(
                        "ml-auto",
                        label === project.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

ProjectSelector.displayName = "ProjectSelector";

export { ProjectSelector };
