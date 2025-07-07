import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Versión tipada de useDispatch para trabajar con thunks
export const useAppDispatch: () => AppDispatch = useDispatch;

// Versión tipada de useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
