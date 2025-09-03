import { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'


const TIPOS = ['visitantes','permissionarios','locacao']
const STATUS = ['ativo','manutencao']


export default function CreateEspaco(){
const [form, setForm] = useState({ name:'', type: TIPOS[0], status: STATUS[0], capacity: 1, notice:'' })
const [error, setError] = useState('')
const navigate = useNavigate()


function update(k, v){ setForm(prev=>({ ...prev, [k]: v })) }


async function onSubmit(e){
e.preventDefault(); setError('')
try{
await api.post('/espacos', {
name: form.name,
type: form.type,
status: form.status,
capacity: Number(form.capacity),
notice: form.notice || undefined
})
navigate('/espacos')
}catch(err){
setError(err?.response?.data?.error || 'Erro ao criar espaço')
}
}


return (
<Card title="Novo Espaço">
<form onSubmit={onSubmit} className="row">
<div style={{flex:'1 1 320px'}}>
<label>Nome</label>
<input className="input" value={form.name} onChange={e=>update('name', e.target.value)} required />
</div>
<div style={{flex:'1 1 200px'}}>
<label>Tipo</label>
<select className="select" value={form.type} onChange={e=>update('type', e.target.value)}>
{TIPOS.map(t=> <option key={t} value={t}>{t}</option>)}
</select>
</div>
<div style={{flex:'1 1 200px'}}>
<label>Status</label>
<select className="select" value={form.status} onChange={e=>update('status', e.target.value)}>
{STATUS.map(s=> <option key={s} value={s}>{s}</option>)}
</select>
</div>
<div style={{flex:'1 1 140px'}}>
<label>Capacidade</label>
<input className="input" type="number" min="1" value={form.capacity} onChange={e=>update('capacity', e.target.value)} />
</div>
<div style={{flex:'1 1 100%'}}>
<label>Aviso (opcional)</label>
<input className="input" value={form.notice} onChange={e=>update('notice', e.target.value)} />
</div>
{error && <div className="badge warn">{error}</div>}
<div style={{width:'100%'}}>
<button className="btn primary" type="submit">Salvar</button>
</div>
</form>
</Card>
)
}