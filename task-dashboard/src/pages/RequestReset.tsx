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
    <main className="flex items-center justify-center min-h-screen bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border p-6 rounded-md shadow-sm max-w-md w-full flex flex-col gap-3"
      >
        <h2 className="text-xl font-semibold text-center text-text">
          Recuperar contraseña
        </h2>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-card border-2 border-border rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-white font-medium py-2 rounded-md transition"
        >
          Enviar enlace
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

export default RequestReset;
