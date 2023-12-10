import { cn } from "@/lib/utils";
import { useNodes } from "@/stores/nodes";
import { Check, ChevronsUpDown } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  PopoverContent,
  PopoverTrigger,
  Popover as ShadcnPopover,
} from "../ui/popover";

const integrations = [
  {
    value: "siemens",
    label: "Siemens",
  },
  {
    value: "develco",
    label: "Develco",
  },
  {
    value: "eaton",
    label: "Eaton",
  },
  {
    value: "ncd",
    label: "NCD",
  },
];

interface Props {
  title: string;
}

export function Popover({ children, title }: PropsWithChildren<Props>) {
  const [nodes, setNodes] = useNodes((state) => [state.nodes, state.setNodes]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <label htmlFor="integration" className="text-sm">
        Provider
      </label>
      <ShadcnPopover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="integration"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between mb-5"
          >
            {value
              ? integrations.find((integration) => integration.value === value)
                  ?.label
              : "Select integration..."}
            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search integrations..." />
            <CommandEmpty>No integration found.</CommandEmpty>
            <CommandGroup>
              {integrations.map((integration) => (
                <CommandItem
                  key={integration.value}
                  value={integration.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === integration.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {integration.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </ShadcnPopover>
      {children}
    </DialogContent>
  );
}
