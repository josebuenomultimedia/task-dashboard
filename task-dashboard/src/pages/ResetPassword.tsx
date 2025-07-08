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
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-8 rounded shadow max-w-md w-full flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Cambiar contraseña
        </h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Guardar contraseña
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-sm text-gray-600 hover:text-gray-800 underline mt-2"
        >
          Volver al login
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
