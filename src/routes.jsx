import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ListEspacos from './pages/Espacos/ListEspacos'
import CreateEspaco from './pages/Espacos/CreateEspacos'
import EditEspaco from './pages/Espacos/EditEspacos'
import BuscarOuCriarCliente from './pages/Clientes/BuscarOuCriarCliente'
import ClientePorCPF from './pages/Clientes/ClientePorCPF'
import ListReservas from './pages/Reservas/ListReservas'
import NovaReserva from './pages/Reservas/NovaReserva'
import NovoStrike from './pages/Strikes/NovoStrike'
import StrikesDoCliente from './pages/Strikes/StrikesDoCliente'
import ListUsers from './pages/Users/ListUsers'
import CreateUser from './pages/Users/CreateUser'
import ProtectedRoute from './components/ProtectedRoute'


export const router = createBrowserRouter([
{ path: '/login', element: <Login/> },
{
path: '/', element: <App/>,
children: [
{ index: true, element: <ProtectedRoute><Dashboard/></ProtectedRoute> },
{ path: 'espacos', element: <ProtectedRoute><ListEspacos/></ProtectedRoute> },
{ path: 'espacos/novo', element: <ProtectedRoute roles={["admin"]}><CreateEspaco/></ProtectedRoute> },
{ path: 'espacos/:id', element: <ProtectedRoute roles={["admin"]}><EditEspaco/></ProtectedRoute> },


{ path: 'clientes/buscar', element: <ProtectedRoute><BuscarOuCriarCliente/></ProtectedRoute> },
{ path: 'clientes/:cpf', element: <ProtectedRoute><ClientePorCPF/></ProtectedRoute> },


{ path: 'reservas', element: <ProtectedRoute><ListReservas/></ProtectedRoute> },
{ path: 'reservas/nova', element: <ProtectedRoute><NovaReserva/></ProtectedRoute> },


{ path: 'strikes/novo', element: <ProtectedRoute roles={["admin","recepcionista"]}><NovoStrike/></ProtectedRoute> },
{ path: 'strikes/cliente/:id', element: <ProtectedRoute roles={["admin","recepcionista"]}><StrikesDoCliente/></ProtectedRoute> },


{ path: 'users', element: <ProtectedRoute roles={["admin"]}><ListUsers/></ProtectedRoute> },
{ path: 'users/novo', element: <ProtectedRoute roles={["admin"]}><CreateUser/></ProtectedRoute> },
]
}
])