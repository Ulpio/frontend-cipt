export default function Card({ title, children, actions }) {
    return (
        <div className="card">
        {title && (
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
                <h3 style={{margin:0}}>{title}</h3>
            <div>{actions}</div>
            </div>
        )}
        {children}
        </div>
    )
}