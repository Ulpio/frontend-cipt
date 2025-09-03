import { useEffect, useState } from 'react'
import api from '../../services/api'
import Card from '../../components/Card'
import { useAuth } from '../../hooks/useAuth'


export default function NovaReserva(){
const { user } = useAuth()
const [espacos, setEspacos] = useState([])
const [form, setForm] = useState({ client_id:'', receptionist_id:'', space_id:'', date:'', start_time:'', duration_hours:1 })
const [error, setError] = useState('')
const [ok, setOk] = useState('')


useEffect(()=>{
(async ()=>{
try {
const { data } = await api.get('/espacos')
setEspacos(Array.isArray(data) ? data : [])
if (user?.user_id) setForm(f=>({ ...f, receptionist_id: user.user_id }))
} catch (err) {
setError(err?.response?.data?.error || 'Erro ao carregar espaços')
}
})()
}, [user])


function update(k,v){ setForm(p=>({ ...p, [k]: v })) }


async function submit(e){
e.preventDefault(); setError(''); setOk('')
try{
await api.post('/reservas', {
client_id: Number(form.client_id),
receptionist_id: Number(form.receptionist_id),
space_id: Number(form.space_id),
date: form.date,
start_time: form.start_time,
duration_hours: Number(form.duration_hours)
})
setOk('Reserva criada com sucesso!')
}catch(err){
setError(err?.response?.data?.error || 'Erro ao criar reserva')
}
}


return (
<Card title="Nova Reserva">
<form onSubmit={submit} className="row">
<div style={{flex:'1 1 180px'}}>
<label>ID do Cliente</label>
<input className="input" value={form.client_id} onChange={e=>update('client_id', e.target.value)} required/>
</div>
<div style={{flex:'1 1 220px'}}>
<label>Recepcionista (seu ID)</label>
<input className="input" value={form.receptionist_id} onChange={e=>update('receptionist_id', e.target.value)} required/>
</div>
<div style={{flex:'1 1 260px'}}>
<label>Espaço</label>
<select className="select" value={form.space_id} onChange={e=>update('space_id', e.target.value)} required>
<option value="">Selecione</option>
{espacos.map(e => <option key={e.id} value={e.id}>{e.name} — {e.status}</option>)}
</select>
</div>
<div style={{flex:'1 1 180px'}}>
<label>Data</label>
<input className="input" type="date" value={form.date} onChange={e=>update('date', e.target.value)} required/>
</div>
<div style={{flex:'1 1 180px'}}>
<label>Hora de início</label>
<input className="input" type="time" value={form.start_time} onChange={e=>update('start_time', e.target.value)} required/>
</div>
<div style={{flex:'1 1 160px'}}>
<label>Duração (h)</label>
<input className="input" type="number" min="1" value={form.duration_hours} onChange={e=>update('duration_hours', e.target.value)} required/>
</div>
{error && <div className="badge warn">{error}</div>}
{ok && <div className="badge ok">{ok}</div>}
<div style={{width:'100%'}}>
<button className="btn primary" type="submit">Salvar</button>
</div>
</form>
</Card>
)
}