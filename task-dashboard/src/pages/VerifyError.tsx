import React from 'react';

const VerifyError: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold mb-2">
          Enlace inválido o expirado
        </h1>
        <p className="text-gray-600 mb-6">
          El enlace de verificación no es válido o ya fue usado. Puedes
          solicitar un nuevo correo de verificación.
        </p>
        <a
          href="/resend-verification"
          className="inline-block px-5 py-2.5 rounded-xl bg-black text-white hover:opacity-90 transition"
        >
          Reenviar verificación
        </a>
      </div>
    </div>
  );
};

export default VerifyError;
