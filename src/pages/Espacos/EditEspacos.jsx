import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'


const TIPOS = ['visitantes','permissionarios','locacao']
const STATUS = ['ativo','manutencao']


export default function EditEspaco(){
const { id } = useParams()
const navigate = useNavigate()
const [form, setForm] = useState({ name:'', type:'visitantes', status:'ativo', capacity:1, notice:'' })
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')


function update(k, v){ setForm(p=>({ ...p, [k]: v })) }


useEffect(()=>{
(async ()=>{
try{
const { data } = await api.get(`/espacos/${id}`)
setForm(data)
} finally { setLoading(false) }
})()
}, [id])


async function saveAll(e){
e.preventDefault(); setError('')
try{
await api.put(`/espacos/${id}`, {
name: form.name,
type: form.type,
status: form.status,
capacity: Number(form.capacity),
notice: form.notice || ''
})
navigate('/espacos')
}catch(err){ setError(err?.response?.data?.error || 'Erro ao salvar') }
}


async function patchAviso(){ await api.patch(`/espacos/${id}/aviso`, { notice: form.notice || '' }) }
async function patchStatus(){ await api.patch(`/espacos/${id}/status`, { status: form.status }) }


if (loading) return <div>Carregando...</div>

return (
<Card title={`Editar Espaço #${id}`}>
<form onSubmit={saveAll} className="row">
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
<div className="nav" style={{marginTop:8}}>
<button type="button" className="btn" onClick={patchStatus}>Aplicar status</button>
</div>
</div>
<div style={{flex:'1 1 140px'}}>
<label>Capacidade</label>
<input className="input" type="number" min="1" value={form.capacity} onChange={e=>update('capacity', e.target.value)} />
</div>
<div style={{flex:'1 1 100%'}}>
<label>Aviso</label>
<input className="input" value={form.notice || ''} onChange={e=>update('notice', e.target.value)} />
<div className="nav" style={{marginTop:8}}>
<button type="button" className="btn" onClick={patchAviso}>Aplicar aviso</button>
</div>
</div>
{error && <div className="badge warn">{error}</div>}
<div style={{width:'100%'}}>
<button className="btn primary" type="submit">Salvar tudo</button>
</div>
</form>
</Card>
)
}