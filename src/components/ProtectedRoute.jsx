import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


export default function ProtectedRoute({ children, roles }) {
const { user, loading } = useAuth()


if (loading) return <div className="container">Carregando...</div>
if (!user) return <Navigate to="/login" replace />
if (roles && !roles.includes((user.role || '').toLowerCase())) return <Navigate to="/" replace />
return children
}