import { useEffect, useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export function TemperatureNode({ data }: NodeProps) {
  const [temp, setTemp] = useState(Math.round(Math.random() * 200));
  useEffect(() => {
    const tempInterval = setInterval(() => {
      const randomValue = Math.round(Math.random() * 200);
      setTemp(randomValue);
      data.onValueChange(randomValue);
    }, 1000);

    return () => {
      clearInterval(tempInterval);
    };
  }, [data, setTemp]);

  return (
    <>
      <div className="p-3 text-xs bg-white border border-black rounded">
        <h1>Sensor temperature</h1>
        <h1 className="text-lg font-bold">{temp} °C</h1>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
