import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { useAppDispatch } from '../app/hooks';
import { setToken } from '../features/auth/authSlice';
import { fetchUserInfo } from '../features/auth/authThunks';
import api from '../api/axiosInstance';

const LoginForm = () => {
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    let hasError = false;
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = 'Por favor introduce tu correo.';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Por favor introduce tu contraseña.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      const { token } = res.data;
      dispatch(setToken(token));
      await dispatch(fetchUserInfo());
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message = err.response?.data?.error || 'Error al iniciar sesión.';

      if (/correo incorrecto/i.test(message)) {
        setErrors({ email: 'Correo incorrecto.' });
      } else if (/contraseña incorrecta/i.test(message)) {
        setErrors({ password: 'Contraseña incorrecta.' });
      } else if (/credenciales inválidas/i.test(message)) {
        // Si el mensaje es genérico, marcar ambos campos
        setErrors({
          email: '',
          password: '',
          general: 'Correo o contraseña incorrectos.',
        });
      } else {
        // Si no sabemos qué es, error general
        setErrors({ general: message });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-3
        w-full max-w-md mx-auto mt-4 sm:mt-6
        px-3
      "
    >
      <h2 className="text-xl font-semibold mb-2 text-text">Iniciar Sesión</h2>

      {/* Error general */}
      {errors.general && (
        <p className="text-sm text-error text-center">{errors.general}</p>
      )}

      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmailInput(e.target.value)}
          className={`bg-card border-2 ${
            errors.email !== undefined || errors.general
              ? 'border-error'
              : 'border-border'
          } rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
        />
        {errors.email && <p className="text-xs text-error">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`bg-card border-2 ${
            errors.password !== undefined || errors.general
              ? 'border-error'
              : 'border-border'
          } rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
        />
        {errors.password && (
          <p className="text-xs text-error">{errors.password}</p>
        )}
      </div>
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
