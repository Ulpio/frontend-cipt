import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Table from '../../components/Table'
import Card from '../../components/Card'
import { useAuth } from '../../hooks/useAuth'


export default function ListEspacos(){
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const { user } = useAuth()


async function fetchData(){
const { data } = await api.get('/espacos')
setData(data)
setLoading(false)
}
useEffect(()=>{ fetchData() }, [])


async function remove(id){
if (!confirm('Excluir espaço?')) return
await api.delete(`/espacos/${id}`)
fetchData()
}


const columns = [
{ title: 'Nome', dataIndex:'name' },
{ title: 'Tipo', dataIndex:'type' },
{ title: 'Capacidade', dataIndex:'capacity' },
{ title: 'Status', dataIndex:'status', render:(v)=> <span className={`badge ${v==='ativo'?'ok':'warn'}`}>{v}</span> },
{ title: 'Aviso', dataIndex:'notice' },
{ title: 'Ações', dataIndex:'id', render:(_,row)=> (
<div className="nav">
{user?.role?.toLowerCase()==='admin' && (
<>
<Link className="btn" to={`/espacos/${row.id}`}>Editar</Link>
<button className="btn danger" onClick={()=>remove(row.id)}>Excluir</button>
</>
)}
</div>
)}
]


return (
<Card title="Espaços" actions={user?.role?.toLowerCase()==='admin' && <Link className="btn primary" to="/espacos/novo">Novo Espaço</Link>}>
{loading ? 'Carregando...' : <Table columns={columns} data={data} />}
</Card>
)
}