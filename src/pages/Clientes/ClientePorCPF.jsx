import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'


export default function ClientePorCPF(){
const { cpf } = useParams()
const [cli, setCli] = useState(null)
const [error, setError] = useState('')


useEffect(()=>{
(async ()=>{
try{ const { data } = await api.get(`/clientes/${cpf}`); setCli(data) }
catch(err){ setError(err?.response?.data?.error || 'Não encontrado') }
})()
}, [cpf])


if (error) return <div className="badge warn">{error}</div>
if (!cli) return <div>Carregando...</div>


return (
<Card title={`Cliente ${cli.name || ''}`}>
<p><strong>ID:</strong> {cli.id}</p>
<p><strong>CPF:</strong> {cli.cpf}</p>
<p><strong>Email:</strong> {cli.email}</p>
<p><strong>Telefone:</strong> {cli.phone}</p>
<p><strong>Strikes:</strong> {cli.strikes}</p>
</Card>
)
}