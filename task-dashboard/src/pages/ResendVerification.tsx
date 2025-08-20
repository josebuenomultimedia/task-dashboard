import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // debe terminar en /api
});

const ResendVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>(
    'idle'
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/auth/resend-verification', { email });
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmit}
        className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-2xl font-semibold mb-4">Reenviar verificación</h1>
        <label className="block text-sm font-medium mb-1">Correo</label>
        <input
          type="email"
          className="w-full border rounded-xl px-4 py-2 mb-4 focus:outline-none"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          disabled={status === 'loading'}
          className="w-full rounded-xl bg-black text-white py-2.5 hover:opacity-90 disabled:opacity-60"
        >
          {status === 'loading' ? 'Enviando...' : 'Reenviar'}
        </button>
        {status === 'ok' && (
          <p className="text-green-600 mt-3">
            Si el correo existe, enviamos un nuevo enlace.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mt-3">
            Hubo un problema. Intenta de nuevo.
          </p>
        )}
      </form>
    </div>
  );
};

export default ResendVerification;
