import { useNavigate } from 'react-router-dom'
import IndicadorStock from './IndicadorStock.jsx'
import { formatearPrecio } from '../utils/formato.js'

// Tabla del inventario; al hacer clic en una fila se abre el detalle
export default function TablaArticulos({ articulos }) {
  const navigate = useNavigate()

  if (articulos.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No hay artículos en esta categoría.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Marca</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3 text-right">Precio</th>
            <th className="px-4 py-3 text-center">Stock</th>
            <th className="px-4 py-3"><span className="sr-only">Acción</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {articulos.map((a) => (
            <tr
              key={a.id}
              onClick={() => navigate(`/articulos/${a.id}`)}
              className="cursor-pointer transition-colors hover:bg-emerald-50"
            >
              <td className="px-4 py-3 font-medium text-slate-900">{a.nombre}</td>
              <td className="px-4 py-3 text-slate-600">{a.marca}</td>
              <td className="px-4 py-3 text-slate-600">{a.tipo}</td>
              <td className="px-4 py-3 text-right tabular-nums">{formatearPrecio(a.precio)}</td>
              <td className="px-4 py-3 text-center"><IndicadorStock stock={a.stock} /></td>
              <td className="px-4 py-3 text-right font-semibold text-emerald-700">Ver detalle →</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
