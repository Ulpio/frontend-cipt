import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'

export default function CreateUser(){
  const [form, setForm] = useState({ name:'', cpf:'', role:'recepcionista' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function update(k,v){ setForm(p=>({ ...p, [k]: v })) }

  async function submit(e){
    e.preventDefault(); setError('')
    try{
      await api.post('/users', form)
      navigate('/users')
    }catch(err){ setError(err?.response?.data?.error || 'Erro ao criar') }
  }

  return (
    <Card title="Novo Usuário">
      <form onSubmit={submit} className="row">
        <div style={{flex:'1 1 260px'}}>
          <label>Nome</label>
          <input className="input" value={form.name} onChange={e=>update('name', e.target.value)} required/>
        </div>
        <div style={{flex:'1 1 220px'}}>
          <label>CPF</label>
          <input className="input" value={form.cpf} onChange={e=>update('cpf', e.target.value)} required/>
        </div>
        <div style={{flex:'1 1 220px'}}>
          <label>Papel</label>
          <select className="select" value={form.role} onChange={e=>update('role', e.target.value)}>
            <option value="admin">admin</option>
            <option value="recepcionista">recepcionista</option>
            <option value="locacao">locacao</option>
          </select>
        </div>
        {error && <div className="badge warn">{error}</div>}
        <div style={{width:'100%'}}>
          <button className="btn primary" type="submit">Salvar</button>
        </div>
      </form>
    </Card>
  )
}