import type { Task } from './tasksSlice';

const STORAGE_KEY = 'taskDashboardData';

export const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const loadTasksFromStorage = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data) as Task[];
    } catch (error) {
      console.error('Error parsing localStorage data', error);
    }
  }
  return [];
};
