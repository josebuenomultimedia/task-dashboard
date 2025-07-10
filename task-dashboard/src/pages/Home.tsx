import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import TaskForm from '../components/TaskForm';
import TaskBoard from '../components/TaskBoard';
import { clearTasks, loadTasksFromAPI } from '../features/tasks/tasksSlice';
import LogoutButton from '../components/LogoutButton';
import DeleteAccountModal from '../components/DeleteAccountModal';

const Home = () => {
  const dispatch = useAppDispatch();
  const email = useSelector((state: RootState) => state.auth.email);
  const guestMode = useSelector((state: RootState) => state.auth.guestMode);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(loadTasksFromAPI());
  }, [dispatch]);

  const handleClear = () => {
    if (confirm('¿Seguro que deseas borrar todas las tareas?')) {
      dispatch(clearTasks());
    }
  };

  return (
    <main className="p-4 max-w-4xl mx-auto mt-6">
      <div className="flex justify-between items-start mb-4 bg-card border border-border p-4 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-text">Panel de Tareas</h1>
          {email && <p className="text-sm text-muted">Bienvenido, {email}</p>}
          {guestMode && (
            <p className="text-xs text-muted mt-1">
              Estás en modo prueba. Tus notas no se guardarán. Si inicias
              sesión, tus notas quedarán guardadas en la base de datos.
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <LogoutButton />
          {!guestMode && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-sm bg-error hover:bg-red-700 text-white px-3 py-1 transition"
            >
              Borrar mi cuenta
            </button>
          )}
        </div>
      </div>

      <TaskForm />

      <button
        onClick={handleClear}
        className="mb-4 bg-error hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md transition"
      >
        Borrar todas las tareas
      </button>

      <TaskBoard />

      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </main>
  );
};

export default Home;
