import React, { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import api from '../api/axiosInstance';

const SITE_KEY = '6LeYVXsrAAAAALSDGXbApwJoBrtw4oU2_NrR7Wmk';

const RegisterForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    recaptcha?: string;
  }>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: typeof errors = {};
    let hasError = false;

    if (!email.trim()) {
      newErrors.email = 'Por favor introduce tu correo.';
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Por favor introduce un correo válido.';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Por favor introduce una contraseña.';
      hasError = true;
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = 'Por favor confirma el reCAPTCHA.';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      await api.post('/auth/register', {
        email,
        password,
        recaptchaToken,
      });

      toast.success(
        'Registro exitoso. Por favor revisa tu correo para verificar tu cuenta antes de ingresar.'
      );
      onSwitchToLogin();
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const message =
        err.response?.data?.error || 'Error al registrar usuario.';

      if (/correo/i.test(message)) {
        setErrors({ email: message });
      } else if (/contraseña/i.test(message)) {
        setErrors({ password: message });
      } else {
        // Si no se sabe, mostrar como error general en el email
        setErrors({ email: message });
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
      <h2 className="text-xl font-semibold mb-2 text-text">Crear cuenta</h2>
      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`bg-card border-2 ${errors.email ? 'border-error' : 'border-border'} rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
        />
        {errors.email && <p className="text-xs text-error">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`bg-card border-2 ${errors.password ? 'border-error' : 'border-border'} rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary`}
        />
        {errors.password && (
          <p className="text-xs text-error">{errors.password}</p>
        )}
      </div>
      <div className="scale-[0.95] sm:scale-100">
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={(token) => setRecaptchaToken(token)}
        />
        {errors.recaptcha && (
          <p className="text-xs text-error mt-1">{errors.recaptcha}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-secondary text-white font-medium py-2 rounded-md transition text-sm"
      >
        Registrarse
      </button>
      <p
        className="text-sm text-primary hover:underline cursor-pointer mt-1"
        onClick={onSwitchToLogin}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </p>
    </form>
  );
};

export default RegisterForm;
