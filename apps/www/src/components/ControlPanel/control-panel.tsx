import { useControlPanel } from "@/stores/controls";
import { XIcon } from "lucide-react";
import { Panel } from "reactflow";

export function ControlPanel() {
  const [selectedControl, setSelectedControl] = useControlPanel((state) => [
    state.selectedControl,
    state.setSelectedControl,
  ]);

  return (
    <Panel
      className="p-5 h-[calc(100%-30px)] bg-white border w-[250px] border-gray-200 rounded-xl"
      position="top-right"
    >
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Edit Relay</h1>
        <div>
          <XIcon
            onClick={() => setSelectedControl()}
            className="w-6 h-6 text-gray-300 duration-100 cursor-pointer hover:rotate-90"
          />
        </div>
      </div>

      {selectedNode?.type === "relay" && (
        <>
          <label htmlFor="variable" className="text-sm">
            Continue if
          </label>
          {/* <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="variable"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? variables.find((variable) => variable.value === value)
                      ?.label
                  : "Select variables..."}
                <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search integrations..." />
                <CommandEmpty>No integration found.</CommandEmpty>
                <CommandGroup>
                  {integrations.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover> */}
        </>
      )}
    </Panel>
  );
}
