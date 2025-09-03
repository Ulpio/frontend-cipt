import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './ProtectedRoute.module.css';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes((user.role || '').toLowerCase())) {
    return <Navigate to="/" replace />;
  }
  return children;
}
