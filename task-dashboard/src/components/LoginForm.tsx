import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../app/hooks';
import { setToken } from '../features/auth/authSlice';
import { fetchUserInfo } from '../features/auth/authThunks';

const LoginForm = () => {
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { token } = res.data;
      dispatch(setToken(token));
      await dispatch(fetchUserInfo());
      toast.success('✅ Login correcto');
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || 'Error al iniciar sesión.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-sm mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-2">Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmailInput(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
