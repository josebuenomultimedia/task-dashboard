import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useEffect, useState } from 'react';

// Versión tipada de useDispatch para trabajar con thunks
export const useAppDispatch: () => AppDispatch = useDispatch;

// Versión tipada de useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useDarkMode() {
  const [enabled, setEnabled] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const html = document.documentElement;
    if (enabled) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [enabled]);

  return [enabled, setEnabled] as const;
}
