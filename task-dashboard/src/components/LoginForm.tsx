import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../app/hooks';
import { setToken } from '../features/auth/authSlice';
import { fetchUserInfo } from '../features/auth/authThunks';
import api from '../api/axiosInstance';

const LoginForm = () => {
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });
      const { token } = res.data;
      dispatch(setToken(token));
      await dispatch(fetchUserInfo());
      toast.success('Login correcto');
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || 'Error al iniciar sesión.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-3
        w-full max-w-md
        mx-auto mt-4 sm:mt-6
        px-3
      "
    >
      <h2 className="text-xl font-semibold mb-2 text-text">Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmailInput(e.target.value)}
        className="bg-card border-2 border-border rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-card border-2 border-border rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-secondary text-white font-medium py-2 rounded-md transition text-sm"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
