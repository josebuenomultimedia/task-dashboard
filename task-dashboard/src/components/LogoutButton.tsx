import { useAppDispatch } from '../app/hooks';
import { clearCredentials } from '../features/auth/authSlice';
import { clearTasks } from '../features/tasks/tasksSlice';
import { toast } from 'react-hot-toast';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    dispatch(clearTasks());
    toast.success('Sesión cerrada');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-muted hover:text-primary transition font-medium"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
