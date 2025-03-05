import * as React from "react";
import { Check, ChevronDown, Folder } from "lucide-react";

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
  onProjectSelect?: (value: string) => void;
}

function fuzzySearch(str: string, query: string): boolean {
  // split the search query into words and deduplicate consecutive characters
  const searchWords = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((word) =>
      word
        .split("")
        .reduce((acc, char) => {
          if (acc.length === 0 || acc[acc.length - 1] !== char) {
            acc.push(char);
          }
          return acc;
        }, [] as string[])
        .join("")
    );

  const strLower = str.toLowerCase();

  return searchWords.every((word) => {
    const pattern = word
      .split("")
      .map((char) => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join(".*");
    const regex = new RegExp(pattern);
    return regex.test(strLower);
  });
}

const ProjectSelector = React.forwardRef<
  HTMLButtonElement,
  ProjectSelectorProps
>(({ projects, onProjectSelect }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleSelect = (currentLabel: string) => {
    setLabel(currentLabel);
    setOpen(false);
    const selectedProject = projects.find(
      (project) => project.label === currentLabel
    );
    if (selectedProject && onProjectSelect) {
      onProjectSelect(selectedProject.value);
    }
  };

  const filteredProjects = React.useMemo(() => {
    const selectedProject = projects.find((project) => project.label === label);

    const filtered = projects
      .filter((project) => {
        if (!search) return true;
        return fuzzySearch(project.label, search);
      })
      .sort((a, b) => a.label.localeCompare(b.label));

    // If we have a selected project that's not in the first 4 results,
    // remove the last item and add the selected project
    if (
      selectedProject &&
      !filtered.slice(0, 4).some((p) => p.label === label)
    ) {
      const firstThree = filtered.slice(0, 3);
      return [...firstThree, selectedProject];
    }

    return filtered.slice(0, 4);
  }, [projects, search, label]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          role="combobox"
          title="Select a project"
          aria-expanded={open}
          aria-controls="project-list"
          className="min-w-[200px] max-w-[400px] flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center truncate">
            <Folder className="mr-2 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">
              {label
                ? projects.find((project) => project.label === label)?.label
                : "Select a project..."}
            </span>
          </div>
          <ChevronDown className="opacity-50 ml-2" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[330px] max-w-[400px] bg-white border border-gray-100 pl-0 pr-0">
        <Command>
          <CommandInput
            placeholder="Search projects by name or number..."
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList id="project-list">
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {filteredProjects.slice(0, 4).map((project) => (
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
                  {project.label}
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
