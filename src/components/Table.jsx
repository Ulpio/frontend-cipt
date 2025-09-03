import styles from './Table.module.css';

export default function Table({ columns = [], data = [] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key || col.title}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row.id ?? idx}>
            {columns.map((col) => (
              <td key={col.key || col.title}>
                {col.render ? col.render(row[col.dataIndex], row) : row[col.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
