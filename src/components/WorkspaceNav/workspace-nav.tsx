import { useWorkspaceNav } from "@/stores/workspace-nav";
import { CogIcon } from "lucide-react";

export function WorkspaceNav() {
  const [selectedTab, selectTab] = useWorkspaceNav((state) => [
    state.selectedTab,
    state.selectTab,
  ]);

  return (
    <div className="flex items-center h-[60px] px-3 w-full border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 duration-200 bg-gray-100 rounded-lg">
          <CogIcon className="w-5 text-gray-400" />
        </div>
        <h1 className="font-bold">Workspace</h1>
      </div>
      <div className="flex self-end ml-16">
        <Tab
          text="Overview"
          isActive={selectedTab === "overview"}
          onClick={() => selectTab("overview")}
        />
        <Tab
          text="Flows"
          isActive={selectedTab === "flow"}
          onClick={() => selectTab("flow")}
        />
        <Tab
          text="Activity"
          isActive={selectedTab === "activity"}
          onClick={() => selectTab("activity")}
        />
      </div>
    </div>
  );
}

interface TabProps {
  text: string;
  isActive: boolean;
  onClick(): void;
}

function Tab({ text, onClick, isActive }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`px-5 text-sm cursor-pointer py-2 border-b-2 ${
        isActive ? "border-blue-600" : "border-transparent"
      }`}
    >
      {text}
    </button>
  );
}
