import { useState } from 'react'
import api from '../../services/api'
import Card from '../../components/Card'


export default function BuscarOuCriarCliente(){
const [cpf, setCpf] = useState('')
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [phone, setPhone] = useState('')
const [result, setResult] = useState(null)
const [error, setError] = useState('')


async function submit(e){
e.preventDefault(); setError('')
try{
const { data } = await api.post('/clientes/buscar-criar', { cpf, name: name || undefined, email: email || undefined, phone: phone || undefined })
setResult(data)
}catch(err){ setError(err?.response?.data?.error || 'Erro ao buscar/criar') }
}


return (
<Card title="Buscar ou Criar Cliente">
<form onSubmit={submit} className="row">
<div style={{flex:'1 1 200px'}}>
<label>CPF *</label>
<input className="input" value={cpf} onChange={e=>setCpf(e.target.value)} required/>
</div>
<div style={{flex:'1 1 200px'}}>
<label>Nome</label>
<input className="input" value={name} onChange={e=>setName(e.target.value)}/>
</div>
<div style={{flex:'1 1 200px'}}>
<label>Email</label>
<input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
</div>
<div style={{flex:'1 1 200px'}}>
<label>Telefone</label>
<input className="input" value={phone} onChange={e=>setPhone(e.target.value)}/>
</div>
<div style={{width:'100%'}}>
<button className="btn primary" type="submit">Buscar/Salvar</button>
</div>
</form>
<hr/>
{error && <div className="badge warn">{error}</div>}
{result && (
<div className="card">
<p><strong>ID:</strong> {result.id}</p>
<p><strong>Nome:</strong> {result.name}</p>
<p><strong>CPF:</strong> {result.cpf}</p>
<p><strong>Email:</strong> {result.email}</p>
<p><strong>Telefone:</strong> {result.phone}</p>
<p><strong>Strikes:</strong> {result.strikes}</p>
</div>
)}
</Card>
)
}