import { Handle, Position } from "reactflow";

export function InputNode() {
  return (
    <>
      <div className="p-3 text-xs border border-blue-200 rounded bg-blue-50">
        <h1>Source</h1>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
