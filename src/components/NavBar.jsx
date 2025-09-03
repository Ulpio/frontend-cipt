import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './NavBar.module.css';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="mdc-top-app-bar">
      <div className="mdc-top-app-bar__row">
        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <span className="mdc-top-app-bar__title">🏢 CIPT Reservas</span>
          <nav className={styles.navLinks}>
            <Link className="mdc-button" to="/">
              <span className="mdc-button__label">Dashboard</span>
            </Link>
            <Link className="mdc-button" to="/espacos">
              <span className="mdc-button__label">Espaços</span>
            </Link>
            <Link className="mdc-button" to="/clientes/buscar">
              <span className="mdc-button__label">Clientes</span>
            </Link>
            <Link className="mdc-button" to="/reservas">
              <span className="mdc-button__label">Reservas</span>
            </Link>
            <Link className="mdc-button" to="/strikes/novo">
              <span className="mdc-button__label">Strikes</span>
            </Link>
            {user?.role?.toLowerCase() === 'admin' && (
              <Link className="mdc-button" to="/users">
                <span className="mdc-button__label">Usuários</span>
              </Link>
            )}
          </nav>
        </section>
        <section
          className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
          role="toolbar"
        >
          {user ? (
            <>
              <span>
                Olá, {user.name} ({user.role})
              </span>
              <button
                className="mdc-button"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                <span className="mdc-button__label">Sair</span>
              </button>
            </>
          ) : (
            <Link className="mdc-button" to="/login">
              <span className="mdc-button__label">Entrar</span>
            </Link>
          )}
        </section>
      </div>
    </header>
  );
}
