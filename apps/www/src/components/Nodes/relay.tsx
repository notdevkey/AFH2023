import { useControlPanel } from "@/stores/controls";
import { useNodes } from "@/stores/nodes";
import { useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Popover } from "..";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";

export function RelayNode({ isConnectable, data, id }: NodeProps) {
  const [comparisonValue, setComparisonValue] = useState(0);
  const [dateValue, setDateValue] = useState("");
  const [selectedControl, selectControl] = useControlPanel((state) => [
    state.selectedControl,
    state.setSelectedControl,
  ]);
  const [action, setAction] = useState<"GT" | "LT" | "EQ">();
  const [nodes, setNodes] = useNodes((state) => [state.nodes, state.setNodes]);
  const currentNode = nodes.find((node) => node.id === id);

  const handleValueChange = (e) => {
    if (e.target.type === "number") {
      setComparisonValue(Number(e.target.value));
    } else if (e.target.type === "date") {
      setDateValue(e.target.value);
    }
  };

  const handleCheck = () => {
    let result = false;
    const inputValue = data.connectedValue; // Fetch value from the connected node
    switch (action) {
      case "GT":
        result = inputValue > comparisonValue;
        break;
      case "EQ":
        result = inputValue === comparisonValue;
        break;
      case "LT":
        result = inputValue < comparisonValue;
        break;
      default:
        break;
    }
    // Send the comparison result to the next node
    data.onResultChange(result);
  };

  console.log(data, "RELAY DATA");

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ left: 10 }}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        isConnectable={isConnectable}
      />

      <Dialog>
        <DialogTrigger>
          <div className="p-3 text-xs bg-white border border-black rounded">
            <h1>Relay</h1>
          </div>
        </DialogTrigger>
        <Popover title="Edit relay">
          <Label className="text-sm">Continue if</Label>
          <div className="px-3 py-1">
            {data.valueType === "date"
              ? (data.connectedValue as Date).toUTCString()
              : data.connectedValue}
          </div>

          <Label className="text-sm">Is</Label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as "GT" | "LT" | "EQ")}
          >
            <option value="GT">Greater Than</option>
            <option value="EQ">Equal To</option>
            <option value="LT">Less Than</option>
          </select>
          <Label className="text-sm">Than/To</Label>

          {data.valueType === "date" ? (
            <input type="date" value={dateValue} onChange={handleValueChange} />
          ) : (
            <input
              type="number"
              value={comparisonValue}
              onChange={handleValueChange}
            />
          )}
        </Popover>
      </Dialog>

      <Handle type="source" position={Position.Bottom} id="c" />
    </>
  );
}
