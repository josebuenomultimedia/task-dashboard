import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useAppDispatch } from './app/hooks';
import { fetchUserInfo } from './features/auth/authThunks';
import { enableGuestMode as enableGuestModeAction } from './features/auth/authSlice';
import { Routes, Route, Link } from 'react-router-dom';
import RequestReset from './pages/RequestReset';
import ResetPassword from './pages/ResetPassword';
import ThemeToggle from './components/ThemeToggle';
import VerifySuccess from './pages/VerifySuccess';
import VerifyError from './pages/VerifyError';
import ResendVerification from './pages/ResendVerification';

function App() {
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const email = useSelector((state: RootState) => state.auth.email);
  const guestMode = useSelector((state: RootState) => state.auth.guestMode);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (token && !email) {
      dispatch(fetchUserInfo());
    }
  }, [token, email, dispatch]);

  const Footer = () => (
    <footer className="mt-auto w-full bg-card border-t border-border py-6 text-center text-xs text-muted">
      <p>© {new Date().getFullYear()} José Alejandro Bueno Salazar</p>
      <p>
        <a
          href="mailto:josebuenomultimedia@gmail.com"
          className="underline hover:text-primary"
        >
          josebuenomultimedia@gmail.com
        </a>
      </p>
      <p className="flex items-center justify-center gap-1 mt-1">
        <a
          href="https://github.com/josebuenomultimedia"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-muted hover:text-text transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0C5.37 0 0 5.373 0 12c0 5.302 
              3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
              0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 
              1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 
              3.495.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.335-5.467-5.933 
              0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 
              0 0 1.008-.322 3.3 1.23.957-.266 
              1.983-.399 3.003-.404 1.02.005 2.047.138 
              3.006.404 2.29-1.552 3.296-1.23 
              3.296-1.23.653 1.653.241 2.873.118 
              3.176.77.84 1.233 1.91 1.233 
              3.22 0 4.61-2.807 5.625-5.48 
              5.922.43.372.823 1.102.823 
              2.222 0 1.606-.015 2.898-.015 
              3.293 0 .321.216.694.825.576C20.565 
              21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
          GitHub
        </a>
      </p>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <ThemeToggle />
      <main className="flex-grow">
        <Routes>
          {!token && !guestMode ? (
            <>
              <Route
                path="/"
                element={
                  <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-6">
                    {/* Tarjeta Login/Register */}
                    <div className="w-full max-w-md bg-card border border-border rounded p-6 sm:p-8 md:p-10 space-y-4">
                      <div className="text-center space-y-1">
                        <h1 className="text-3xl font-semibold text-text">
                          Task Dashboard
                        </h1>
                        <p className="text-sm text-muted">
                          Organiza y gestiona tus tareas fácilmente
                        </p>
                      </div>

                      {isRegistering ? (
                        <RegisterForm
                          onSwitchToLogin={() => setIsRegistering(false)}
                        />
                      ) : (
                        <>
                          <LoginForm />
                          <p
                            className="text-sm text-primary hover:underline cursor-pointer text-center"
                            onClick={() => setIsRegistering(true)}
                          >
                            ¿No tienes cuenta? Regístrate aquí
                          </p>
                          <p className="text-xs text-muted text-center mt-2">
                            <Link
                              to="/request-reset"
                              className="underline hover:text-primary"
                            >
                              ¿Olvidaste tu contraseña?
                            </Link>
                          </p>
                          <button
                            onClick={() => dispatch(enableGuestModeAction())}
                            className="
                              w-full
                              bg-border
                              text-text
                              py-2
                              rounded
                              hover:bg-card
                              transition
                              text-sm sm:text-base
                            "
                          >
                            Ingresar en modo prueba
                          </button>
                        </>
                      )}
                    </div>

                    {/* Tarjeta Descripción */}
                    <div className="w-full max-w-4xl bg-card border border-border rounded p-6 text-left space-y-2">
                      <h3 className="text-sm font-semibold text-text mb-2">
                        Sobre esta aplicación
                      </h3>
                      <ul className="list-disc pl-5 text-sm text-muted space-y-1">
                        <li>
                          Este proyecto personal fue diseñado y desarrollado de
                          forma independiente por mi (José Bueno), empleando
                          buenas prácticas de desarrollo web y apoyándome en
                          herramientas de generación de código y documentación
                          como ChatGPT.
                        </li>
                        <li>
                          Permite crear una cuenta gratuita para gestionar
                          tareas desde cualquier dispositivo.
                        </li>
                        <li>
                          También puedes usar el modo prueba sin registro (los
                          datos no se guardan).
                        </li>
                        <li>
                          Si una tarea permanece en estado{' '}
                          <strong>En progreso</strong> durante más de 7 días,
                          recibirás un correo recordatorio automático.
                        </li>
                        <li>
                          El sistema de autenticación incluye:
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>
                              Registro con verificación por correo electrónico
                              (no puedes ingresar hasta confirmar tu cuenta).
                            </li>
                            <li>
                              Prevención de duplicados: si ocurre un error en el
                              envío del correo, el usuario no queda registrado
                              en la base de datos.
                            </li>
                            <li>
                              Página de verificación en el frontend, con
                              mensajes claros de éxito o error al hacer clic en
                              el enlace enviado.
                            </li>
                            <li>
                              Correos personalizados para{' '}
                              <strong>registro</strong>,{' '}
                              <strong>verificación</strong> y{' '}
                              <strong>recordatorios de tareas</strong>.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Puedes:
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>
                              Crear tareas con el botón{' '}
                              <strong>+ Nueva tarea</strong>.
                            </li>
                            <li>
                              Marcar tareas como importantes, que se muestran
                              primero y resaltadas.
                            </li>
                            <li>
                              Mover tarjetas arrastrándolas o usando los botones
                              de estado.
                            </li>
                            <li>Eliminar tareas con el icono de papelera.</li>
                            <li>
                              Cambiar entre modo claro y modo oscuro,
                              conservando la preferencia.
                            </li>
                          </ul>
                        </li>
                        <li>
                          <span className="font-medium">
                            Tecnologías utilizadas:
                          </span>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>
                              <strong>Frontend:</strong> React, Vite, Tailwind
                              CSS, Redux Toolkit, TypeScript.
                            </li>
                            <li>
                              <strong>Backend:</strong> Node.js, Express,
                              MongoDB, JWT, Brevo (Sendinblue), Nodemailer.
                            </li>
                            <li>
                              <strong>Testing:</strong> Jest, Supertest.
                            </li>
                            <li>
                              <strong>Despliegue:</strong> Vercel y Railway.
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                }
              />
              <Route path="/request-reset" element={<RequestReset />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              {/* Verificación de email */}
              + <Route path="/Verify/success" element={<VerifySuccess />} />
              + <Route path="/verify/error" element={<VerifyError />} />+{' '}
              <Route
                path="/resend-verification"
                element={<ResendVerification />}
              />
            </>
          ) : (
            <Route path="*" element={<Home />} />
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
