import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export interface Task {
  _id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

interface TasksState {
  list: Task[];
  loading: boolean;
}

const initialState: TasksState = {
  list: [],
  loading: false,
};

export const loadTasksFromAPI = createAsyncThunk(
  'tasks/loadFromAPI',
  async () => {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  }
);

export const addTaskToAPI = createAsyncThunk(
  'tasks/addTask',
  async (task: { title: string }) => {
    const response = await axiosInstance.post('/tasks', {
      ...task,
      status: 'todo',
    });
    return response.data;
  }
);

export const updateTaskStatusInAPI = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, status }: { id: string; status: Task['status'] }) => {
    const response = await axiosInstance.put(`/tasks/${id}`, { status });
    return response.data;
  }
);

export const deleteTaskFromAPI = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    await axiosInstance.delete(`/tasks/${id}`);
    return id;
  }
);

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
      .addCase(loadTasksFromAPI.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addTaskToAPI.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTaskStatusInAPI.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteTaskFromAPI.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export const { clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
