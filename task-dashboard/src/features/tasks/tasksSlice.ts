import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import type { RootState } from '../../app/store';

export interface Task {
  _id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  important?: boolean;
}

interface TasksState {
  list: Task[];
  loading: boolean;
}

const initialState: TasksState = {
  list: [],
  loading: false,
};

// 🔹 Cargar tareas
export const loadTasksFromAPI = createAsyncThunk<
  Task[],
  void,
  { state: RootState }
>('tasks/loadFromAPI', async (_, { getState }) => {
  const { guestMode } = getState().auth;
  if (guestMode) {
    // En modo prueba, empieza vacío
    return [];
  }
  const response = await axiosInstance.get('/tasks');
  return response.data;
});

// 🔹 Crear tarea
export const addTaskToAPI = createAsyncThunk<
  Task,
  { title: string; important?: boolean },
  { state: RootState }
>('tasks/addTask', async (task, { getState }) => {
  const { guestMode } = getState().auth;
  if (guestMode) {
    return {
      _id: Math.random().toString(36).substring(2, 9),
      title: task.title,
      status: 'todo',
      important: task.important ?? false,
    };
  }
  const response = await axiosInstance.post('/tasks', {
    ...task,
    status: 'todo',
  });
  return response.data;
});

// 🔹 Actualizar tarea
export const updateTaskStatusInAPI = createAsyncThunk<
  Task,
  { id: string; status: Task['status'] },
  { state: RootState }
>('tasks/updateTask', async ({ id, status }, { getState }) => {
  const { guestMode } = getState().auth;
  if (guestMode) {
    // Simular actualización
    return {
      _id: id,
      title: 'Tarea simulada',
      status,
    };
  }
  const response = await axiosInstance.put(`/tasks/${id}`, { status });
  return response.data;
});

// 🔹 Eliminar tarea
export const deleteTaskFromAPI = createAsyncThunk<
  string,
  string,
  { state: RootState }
>('tasks/deleteTask', async (id, { getState }) => {
  const { guestMode } = getState().auth;
  if (guestMode) {
    // Simular eliminación
    return id;
  }
  await axiosInstance.delete(`/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasksFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTasksFromAPI.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addTaskToAPI.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTaskStatusInAPI.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.list[index].status = action.payload.status;
        }
      })
      .addCase(deleteTaskFromAPI.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export const { clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
