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

  if (!token && !guestMode) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
              <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 space-y-4 -mt-12">
                <div className="text-center space-y-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Task Dashboard
                  </h1>
                  <p className="text-sm text-gray-500">
                    Hecho por José Alejandro Bueno Salazar
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
                      className="text-sm text-indigo-600 hover:underline cursor-pointer text-center"
                      onClick={() => setIsRegistering(true)}
                    >
                      ¿No tienes cuenta? Regístrate aquí
                    </p>
                    <p className="text-xs text-gray-600 text-center mt-2">
                      <Link
                        to="/request-reset"
                        className="underline hover:text-indigo-600"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </p>
                    <button
                      onClick={() => dispatch(enableGuestModeAction())}
                      className="
                        w-full
                        bg-gray-700
                        text-white
                        py-2
                        rounded
                        hover:bg-gray-800
                        transition
                        text-sm sm:text-base
                      "
                    >
                      Ingresar en modo prueba
                    </button>
                  </>
                )}
              </div>
            </div>
          }
        />
        <Route path="/request-reset" element={<RequestReset />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    );
  }

  const Footer = () => (
    <footer className="mt-auto w-full bg-gray-50 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} José Alejandro Bueno Salazar</p>
      <p>
        <a
          href="mailto:josebuenomultimedia@gmail.com"
          className="underline hover:text-indigo-600"
        >
          josebuenomultimedia@gmail.com
        </a>
      </p>
      <p className="flex items-center justify-center gap-1 mt-1">
        <a
          href="https://github.com/josebuenomultimedia"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition"
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
