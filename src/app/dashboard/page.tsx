"use client";

import { ReactFlowProvider } from "reactflow";

import { Sidebar, WorkspaceNav } from "@/components";
import { Flow } from "@/components/Flow";
import { useWorkspaceNav } from "@/stores/workspace-nav";

export default function App() {
  const [selectedTab] = useWorkspaceNav((state) => [state.selectedTab]);
  return (
    <main className="flex h-screen">
      <Sidebar />
      <div className="grid grid-rows-[auto_1fr] w-full h-full">
        <WorkspaceNav />
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </main>
  );
}
