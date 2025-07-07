import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import TaskForm from '../components/TaskForm';
import TaskBoard from '../components/TaskBoard';
import { clearTasks, loadTasksFromAPI } from '../features/tasks/tasksSlice';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
  const dispatch = useAppDispatch();
  const email = useSelector((state: RootState) => state.auth.email);

  useEffect(() => {
    dispatch(loadTasksFromAPI());
  }, [dispatch]);

  const handleClear = () => {
    if (confirm('¿Seguro que deseas borrar todas las tareas?')) {
      dispatch(clearTasks());
    }
  };

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Panel de Tareas</h1>
          {email && (
            <p className="text-sm text-gray-600">Bienvenido, {email}</p>
          )}
        </div>
        <LogoutButton />
      </div>
      <TaskForm />
      <button
        onClick={handleClear}
        className="mb-4 text-sm text-red-600 hover:underline"
      >
        Borrar todas las tareas
      </button>
      <TaskBoard />
    </main>
  );
};

export default Home;
