import { useState } from 'react'
import api from '../../services/api'
import Card from '../../components/Card'

export default function NovoStrike(){
  const [form, setForm] = useState({ client_id:'', reason:'', photo:'' })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  function update(k,v){ setForm(p=>({ ...p, [k]: v })) }

  async function submit(e){
    e.preventDefault(); setMsg(''); setError('')
    try{
      await api.post('/strikes', { client_id: Number(form.client_id), reason: form.reason, photo: form.photo || undefined })
      setMsg('Strike registrado')
    }catch(err){ setError(err?.response?.data?.error || 'Erro ao registrar') }
  }

  return (
    <Card title="Registrar Strike">
      <form onSubmit={submit} className="row">
        <div style={{flex:'1 1 200px'}}>
          <label>ID do Cliente</label>
          <input className="input" value={form.client_id} onChange={e=>update('client_id', e.target.value)} required/>
        </div>
        <div style={{flex:'1 1 100%'}}>
          <label>Motivo</label>
          <input className="input" value={form.reason} onChange={e=>update('reason', e.target.value)} required/>
        </div>
        <div style={{flex:'1 1 100%'}}>
          <label>Foto (URL opcional)</label>
          <input className="input" value={form.photo} onChange={e=>update('photo', e.target.value)} />
        </div>
        {error && <div className="badge warn">{error}</div>}
        {msg && <div className="badge ok">{msg}</div>}
        <div style={{width:'100%'}}>
          <button className="btn primary" type="submit">Salvar</button>
        </div>
      </form>
    </Card>
  )
}