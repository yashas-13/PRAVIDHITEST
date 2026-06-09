import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  cursorType: 'default' | 'pointer' | 'text';
  setCursorType: (type: 'default' | 'pointer' | 'text') => void;
}

export const useStore = create<AppState>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  cursorType: 'default',
  setCursorType: (cursorType) => set({ cursorType }),
}));
