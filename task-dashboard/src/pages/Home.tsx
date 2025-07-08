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
  const guestMode = useSelector((state: RootState) => state.auth.guestMode);

  return (
    <main className="p-4 max-w-4xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4 bg-white/90 p-3 rounded shadow">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Panel de Tareas
          </h1>
          {email && (
            <p className="text-sm text-gray-600">Bienvenido, {email}</p>
          )}
          {guestMode && (
            <p className="text-xs text-gray-500 mt-1">
              Estás en modo prueba. Tus notas no se guardarán. Si inicias
              sesión, tus notas quedarán guardadas en la base de datos.
            </p>
          )}
        </div>
        <LogoutButton />
      </div>

      <TaskForm />
      <button
        onClick={handleClear}
        className="mb-4 bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Borrar todas las tareas
      </button>

      <TaskBoard />
    </main>
  );
};

export default Home;
