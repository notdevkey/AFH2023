import { NodeFunction, NodeType, useNodes } from "@/stores/nodes";
import {
  BellIcon,
  CalendarIcon,
  PlugIcon,
  ThermometerIcon,
  ToggleLeftIcon,
  ZapIcon,
} from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { ReactNode } from "react";

export function Sidebar() {
  return (
    <div className="p-5 w-[300px] border-r border-gray-200 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <Image src="/logo.svg" alt="Logo" width={20} height={30} />
        <h2 className="text-sm font-bold">SaveSome</h2>
        <div className="flex items-center justify-center w-8 h-8 ml-auto duration-200 rounded-lg cursor-pointer hover:bg-gray-100">
          <BellIcon className="w-5 text-gray-400" />
        </div>
      </div>
      <div className="mb-5">
        <h6 className="mb-2 text-xs font-bold text-gray-400 uppercase">
          Triggers
        </h6>
        <NodeButton
          name="Time & Date"
          icon={<CalendarIcon className="w-5 h-5" />}
          color="yellow"
          nodeFunction="date"
          nodeType="trigger"
        />
        <NodeButton
          name="NordPool"
          icon={<ZapIcon className="w-5 h-5" />}
          color={"blue"}
          nodeFunction="nordpool"
          nodeType="trigger"
        />
        <NodeButton
          name="Temperature"
          icon={<ThermometerIcon className="w-5 h-5" />}
          color={"orange"}
          nodeFunction="temperature"
          nodeType="trigger"
        />
      </div>
      <div className="mb-5">
        <h6 className="mb-2 text-xs font-bold text-gray-400 uppercase">
          Actions
        </h6>
        <NodeButton
          name="Relay"
          icon={<ToggleLeftIcon className="w-5 h-5" />}
          color={"purple"}
          nodeFunction="relay"
          nodeType="action"
        />
      </div>
      <div className="mb-5">
        <h6 className="mb-2 text-xs font-bold text-gray-400 uppercase">I/O</h6>
        <NodeButton
          name="Input"
          icon={<PlugIcon className="w-5 h-5" />}
          color={"blue"}
          nodeFunction="input"
          nodeType="io"
        />
        <NodeButton
          name="Output"
          icon={<PlugIcon className="w-5 h-5" />}
          color={"blue"}
          nodeFunction="output"
          nodeType="io"
        />
      </div>
    </div>
  );
}

interface NodeButtonProps {
  name: string;
  color: string;
  nodeFunction: NodeFunction;
  nodeType: NodeType;
  icon: ReactNode;
}

function NodeButton({
  icon,
  name,
  color,
  nodeFunction,
  nodeType,
}: NodeButtonProps) {
  const [nodes, setNodes] = useNodes((state) => [state.nodes, state.setNodes]);

  return (
    <button
      onClick={() => {
        setNodes([
          ...nodes,
          {
            id: nanoid(),
            type: nodeFunction,
            data: { nodeType, flowThrough: true },
            position: { x: 0, y: 0 },
          },
        ]);
      }}
      className="flex items-center w-full gap-3 p-2 duration-100 rounded-xl hover:bg-gray-50"
    >
      <div
        className={`flex items-center justify-center w-8 h-8 duration-200 rounded-lg ${
          color === "blue" && "bg-blue-100"
        } ${color === "yellow" && "bg-yellow-100"} ${
          color === "orange" && "bg-orange-100"
        } ${color === "purple" && "bg-purple-100"}`}
      >
        <div
          className={`${color === "blue" && "text-blue-400"} ${
            color === "yellow" && "text-yellow-400"
          } ${color === "orange" && "text-orange-400"} ${
            color === "purple" && "text-purple-400"
          }`}
        >
          {icon}
        </div>
      </div>
      <h5 className="text-sm font-bold">{name}</h5>
    </button>
  );
}
