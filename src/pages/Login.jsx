import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';

export default function Login() {
  const { login } = useAuth();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login({ cpf, password });
      navigate('/');
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao autenticar');
    }
  }

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <Card title="Entrar">
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>CPF</label>
            <input
              className="input"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Somente números"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Senha</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div
              className="badge warn"
              style={{ display: 'inline-block', marginBottom: 12 }}
            >
              {error}
            </div>
          )}
          <button className="btn primary" type="submit">
            Entrar
          </button>
        </form>
      </Card>
    </div>
  );
}
