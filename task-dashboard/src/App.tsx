import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './app/hooks';

import type { RootState } from './app/store';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { fetchUserInfo } from './features/auth/authThunks';

function App() {
  const dispatch = useAppDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const email = useSelector((state: RootState) => state.auth.email);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (token && !email) {
      dispatch(fetchUserInfo());
    }
  }, [token, email, dispatch]);

  if (!token) {
    return (
      <div>
        {isRegistering ? (
          <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
        ) : (
          <>
            <LoginForm />
            <p
              className="text-sm text-blue-600 hover:underline cursor-pointer text-center mt-2"
              onClick={() => setIsRegistering(true)}
            >
              ¿No tienes cuenta? Regístrate aquí
            </p>
          </>
        )}
      </div>
    );
  }

  return <Home />;
}

export default App;
