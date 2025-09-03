import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import Card from '../../components/Card'

export default function StrikesDoCliente(){
  const { id } = useParams()
  const [items, setItems] = useState([])

  async function load(){
    const { data } = await api.get(`/strikes/client/${id}`)
    setItems(data)
  }
  useEffect(()=>{ load() }, [id])

  async function revoke(sid){
    if(!confirm('Revogar strike?')) return
    await api.delete(`/strikes/${sid}`)
    load()
  }

  return (
    <Card title={`Strikes do Cliente #${id}`}>
      {items.length === 0 ? 'Nenhum strike.' : (
        <ul>
          {items.map(s => (
            <li key={s.id} style={{marginBottom:8}}>
              <strong>#{s.id}</strong> — {s.reason} — {s.created_at} {s.revoked && '(revogado)'}
              {!s.revoked && (
                <button className="btn danger" style={{marginLeft:8}} onClick={()=>revoke(s.id)}>Revogar</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}