import { create } from 'zustand';

export interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  incrementByAmount: (amount: number) => void;
}

export const useCounter = create<CounterState>((set) => ({
  count: 0,
  increment: (): void => {
    set((state) => ({ count: state.count + 1 }));
  },
  decrement: (): void => {
    set((state) => ({ count: state.count - 1 }));
  },
  incrementByAmount: (amount): void => {
    set((state) => ({ count: state.count + amount }));
  },
}));
