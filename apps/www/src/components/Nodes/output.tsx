import { Handle, Position } from "reactflow";

export function OutputNode() {
  return (
    <>
      <div className="p-3 text-xs border border-blue-200 rounded bg-blue-50">
        <h1>Destination</h1>
      </div>
      <Handle type="target" position={Position.Top} id="a" />
    </>
  );
}
