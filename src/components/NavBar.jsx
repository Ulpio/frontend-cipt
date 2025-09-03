import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


export default function NavBar(){
const { user, logout } = useAuth()
const navigate = useNavigate()


return (
<header className="header">
<div style={{display:'flex', gap:12, alignItems:'center'}}>
<strong>🏢 CIPT Reservas</strong>
<nav className="nav">
<Link to="/">Dashboard</Link>
<Link to="/espacos">Espaços</Link>
<Link to="/clientes/buscar">Clientes</Link>
<Link to="/reservas">Reservas</Link>
<Link to="/strikes/novo">Strikes</Link>
{user?.role?.toLowerCase() === 'admin' && <Link to="/users">Usuários</Link>}
</nav>
</div>
<div className="nav">
{user ? (
<>
<span>Olá, {user.name} ({user.role})</span>
<button className="btn" onClick={() => { logout(); navigate('/login') }}>Sair</button>
</>
) : (
<Link to="/login" className="btn">Entrar</Link>
)}
</div>
</header>
)
}