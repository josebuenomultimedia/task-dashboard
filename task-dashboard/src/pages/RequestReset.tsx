import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor introduce tu correo.');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/request-reset`, {
        email,
      });
      toast.success('Te enviamos un enlace de recuperación.');
      navigate('/');
    } catch {
      toast.error('Error al solicitar recuperación.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-8 rounded shadow max-w-md w-full flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Recuperar contraseña
        </h2>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Enviar enlace
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

export default RequestReset;
