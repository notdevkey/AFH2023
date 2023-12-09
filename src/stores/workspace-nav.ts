import { create } from "zustand";

type Tab = "flow" | "overview" | "activity";

interface WorkspaceNavState {
  selectedTab: Tab;
  selectTab: (tab: Tab) => void;
}

export const useWorkspaceNav = create<WorkspaceNavState>()((set) => ({
  selectedTab: "overview",
  selectTab: (tab) => set(() => ({ selectedTab: tab })),
}));
