import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import './styles/globals.css';

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
