import { useEffect, useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import TaskForm from '../components/TaskForm';
import TaskBoard from '../components/TaskBoard';
import { clearTasks, loadTasksFromAPI } from '../features/tasks/tasksSlice';
import LogoutButton from '../components/LogoutButton';
import DeleteAccountModal from '../components/DeleteAccountModal';
import ConfirmClearModal from '../components/ConfirmClearModal';

const Home = () => {
  const dispatch = useAppDispatch();
  const email = useSelector((state: RootState) => state.auth.email);
  const guestMode = useSelector((state: RootState) => state.auth.guestMode);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    dispatch(loadTasksFromAPI());
  }, [dispatch]);

  return (
    <main className="p-4 max-w-4xl mx-auto mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 bg-card border border-border p-4 shadow-sm">
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
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          {/* Borrar todas las tareas */}
          <button
            onClick={() => setShowClearModal(true)}
            className="text-sm border border-error text-error px-3 py-1 rounded-md hover:bg-error/10 transition"
          >
            Borrar todas las tareas
          </button>

          {/* Borrar mi cuenta */}
          {!guestMode && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-sm bg-error hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
            >
              Borrar mi cuenta
            </button>
          )}

          {/* Logout */}
          <LogoutButton />
        </div>
      </div>

      {/* Formulario de creación de tarea */}
      <TaskForm />

      {/* Listado de tareas */}
      <TaskBoard />

      {/* Modal de borrar cuenta */}
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}

      {/* Modal de confirmar borrado de todas las tareas */}
      {showClearModal && (
        <ConfirmClearModal
          onConfirm={() => {
            dispatch(clearTasks());
            setShowClearModal(false);
          }}
          onCancel={() => setShowClearModal(false)}
        />
      )}
    </main>
  );
};

export default Home;
