"use client";

import { ReactFlowProvider } from "reactflow";

import { Activity, Overview, Sidebar, WorkspaceNav } from "@/components";
import { Flow } from "@/components/Flow";
import { useWorkspaceNav } from "@/stores/workspace-nav";

export default function App() {
  const [selectedTab] = useWorkspaceNav((state) => [state.selectedTab]);
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="grid grid-rows-[auto_1fr] w-full h-full">
        <WorkspaceNav />
        {selectedTab === "flow" && (
          <ReactFlowProvider>
            <Flow />
          </ReactFlowProvider>
        )}
        {selectedTab === "overview" && <Overview />}
        {selectedTab === "activity" && <Activity />}
      </div>
    </main>
  );
}
