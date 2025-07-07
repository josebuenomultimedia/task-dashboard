import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../api/axiosInstance';

const SITE_KEY = '6LereXUrAAAAAHzpyBNket1pLI1Tce17xlUpAAO_';

const RegisterForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Todos los campos son obligatorios.');
      return;
    }
    if (!recaptchaToken) {
      toast.error('Por favor confirma el reCAPTCHA.');
      return;
    }

    try {
      await api.post('/auth/register', {
        email,
        password,
        recaptchaToken,
      });

      toast.success(
        '✅ Usuario creado correctamente. Ahora puedes iniciar sesión.'
      );
      onSwitchToLogin();
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || 'Error al registrar usuario.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-sm mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-2">Crear cuenta</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <ReCAPTCHA
        sitekey={SITE_KEY}
        onChange={(token) => setRecaptchaToken(token)}
      />
      <button
        type="submit"
        className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Registrarse
      </button>
      <p
        className="text-sm text-blue-600 hover:underline cursor-pointer"
        onClick={onSwitchToLogin}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </p>
    </form>
  );
};

export default RegisterForm;
