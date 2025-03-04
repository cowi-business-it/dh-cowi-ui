"use client"

import * as React from "react"
import { Check, ChevronDown, Folder } from "lucide-react"

import { cn } from "../../core/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface ValueLabelPair {
  value: string,
  label: string,
}

const projects: ValueLabelPair[] = [
  {
    value: "A123456",
    label: "A123456 - Office Building Alpha",
  },
  {
    value: "0991807",
    label: "0991807 - Bispebjerg Hospital",
  },
  {
    value: "A282886",
    label: "A282886 - New hospital",
  },
  {
    value: "B123456",
    label: "423456 - Office Building Beta",
  },
  {
    value: "G123456",
    label: "423456 - Office Building Gama",
  },
]

export function ProjectSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="min-w-[200px] flex items-center justify-between cursor-pointer"
        >
          <Folder className="mr-2"/>
          {value
            ? projects.find(
                (project) => project.value === value
              )?.label
            : "Select a project..."}
            
          <ChevronDown className="opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search projects..." className="h-9" />
          <CommandList>
            <CommandEmpty>No projects found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.value}
                  value={project.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  {project.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === project.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
