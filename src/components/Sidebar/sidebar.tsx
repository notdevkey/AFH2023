import { useNodes } from "@/stores/nodes";
import { BellIcon, CalendarIcon, ZapIcon } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { ReactNode } from "react";

export function Sidebar() {
  const [nodes, setNodes] = useNodes((state) => [state.nodes, state.setNodes]);

  console.log(nodes);

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
        <h6 className="mb-5 text-xs font-bold text-gray-400 uppercase">
          Triggers
        </h6>
        <NodeButton
          name="Time & Date"
          icon={<CalendarIcon className="w-5 h-5" />}
          color="yellow"
          onClick={() => {
            setNodes([
              ...nodes,
              {
                id: nanoid(),
                type: "date",
                data: { label: "Date & Time" },
                position: { x: 250, y: 5 },
              },
            ]);
          }}
          id="test"
        />
        <NodeButton
          name="NordPool"
          icon={<ZapIcon className="w-5 h-5" />}
          color={"blue"}
          id="test"
        />
      </div>
      <h6 className="text-xs font-bold text-gray-400 uppercase">Actions</h6>
    </div>
  );
}

interface NodeButtonProps {
  name: string;
  color: string;
  id: string;
  onClick?(): void;
  icon: ReactNode;
}

function NodeButton({ icon, id, name, color, onClick }: NodeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full gap-3 p-2 duration-100 rounded-xl hover:bg-gray-50"
    >
      <div
        className={`flex items-center justify-center w-8 h-8 duration-200 rounded-lg ${
          color === "blue" && "bg-blue-100"
        } ${color === "yellow" && "bg-yellow-100"}`}
      >
        <div
          className={`${color === "blue" && "text-blue-400"} ${
            color === "yellow" && "text-yellow-400"
          }`}
        >
          {icon}
        </div>
      </div>
      <h5 className="text-sm font-bold">{name}</h5>
    </button>
  );
}
