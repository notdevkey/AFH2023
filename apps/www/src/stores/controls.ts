import { create } from "zustand";

type ControlType = "relay" | "control";

interface ControlsState {
  selectedControl?: string;
  setSelectedControl(control?: string): void;
}

export const useControlPanel = create<ControlsState>()((set) => ({
  setSelectedControl: (control: string) =>
    set(() => ({ selectedControl: control })),
}));
