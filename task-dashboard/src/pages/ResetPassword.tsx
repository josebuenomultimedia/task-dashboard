import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error('Por favor introduce la nueva contraseña.');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        token,
        newPassword: password,
      });
      toast.success('Contraseña actualizada. Ahora puedes iniciar sesión.');
      navigate('/');
    } catch {
      toast.error('Error al actualizar contraseña.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border p-6 rounded-md shadow-sm max-w-md w-full flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold text-center text-text">
          Cambiar contraseña
        </h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-card border-2 border-border rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-white font-medium py-2 rounded-md transition"
        >
          Guardar contraseña
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-sm text-muted hover:text-primary transition text-center mt-1"
        >
          Volver al login
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
