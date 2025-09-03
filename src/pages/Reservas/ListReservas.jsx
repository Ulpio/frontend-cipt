import { useEffect, useState } from 'react'
import api from '../../services/api'
import Card from '../../components/Card'
import Table from '../../components/Table'


export default function ListReservas(){
const [items, setItems] = useState([])
const [loading, setLoading] = useState(true)


useEffect(()=>{
(async ()=>{
const { data } = await api.get('/reservas')
setItems(data)
setLoading(false)
})()
}, [])


const columns = [
{ title: 'Espaço', dataIndex:'space_name' },
{ title: 'Cliente', dataIndex:'client_name' },
{ title: 'Recepcionista', dataIndex:'receptionist_name' },
{ title: 'Data', dataIndex:'date' },
{ title: 'Início', dataIndex:'start_time' },
{ title: 'Fim', dataIndex:'end_time' },
{ title: 'Horas', dataIndex:'duration_hours' },
]
return (
<Card title="Reservas">
{loading ? 'Carregando...' : <Table columns={columns} data={items}/>}
</Card>
)
}