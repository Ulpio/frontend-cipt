import Card from '../components/Card'


export default function Dashboard(){
return (
<div className="row">
<div style={{flex:'1 1 340px'}}>
<Card title="Agenda Consolidada (breve)">
<p>Esta seção futuramente mostrará um calendário consolidado e filtros.</p>
</Card>
</div>
<div style={{flex:'1 1 340px'}}>
<Card title="Ações Rápidas">
<ul>
<li>🔎 Buscar/Crear Cliente</li>
<li>📝 Nova Reserva</li>
<li>🏢 Novo Espaço (admin)</li>
</ul>
</Card>
</div>
</div>
)
}