import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem(import.meta.env.VITE_ACCESS_TOKEN_KEY);
    const email = localStorage.getItem('userEmail');

    if (token && !isAuthenticated) {
      // If token exists but Redux state is not authenticated, update Redux state
      dispatch(
        loginSuccess({
          data: {
            token,
            refreshToken: token,
            email: email || 'admin@example.com',
          },
        })
      );
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
