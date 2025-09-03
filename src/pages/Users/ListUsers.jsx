import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'

export default function ListUsers(){
  const [items, setItems] = useState([])
  useEffect(()=>{ (async ()=>{ const { data } = await api.get('/users'); setItems(data) })() }, [])
  return (
    <Card title="Usuários" actions={<Link className="btn primary" to="/users/novo">Novo</Link>}>
      <ul>
        {items.map(u => (<li key={u.user_id}>#{u.user_id} — {u.name} ({u.role}) — CPF: {u.cpf}</li>))}
      </ul>
    </Card>
  )
}