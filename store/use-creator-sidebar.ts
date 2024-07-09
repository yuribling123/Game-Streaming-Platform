/* access and modify sidebar state */

import { create } from "zustand";

// manage the state of sidebar:  methods to expand and collapse it

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void; 
}

export const useCreatorSideBar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}));