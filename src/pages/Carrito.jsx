import { Link } from 'react-router-dom'
import TituloPagina from '../components/TituloPagina.jsx'
import Boton from '../components/Boton.jsx'
import SelectorCantidad from '../components/SelectorCantidad.jsx'
import { useInventario } from '../context/InventarioContext.jsx'
import { formatearPrecio } from '../utils/formato.js'

export default function Carrito() {
  const { itemsCarrito, totalUnidades, totalPagar, aumentarCantidad, disminuirCantidad, quitarDelCarrito, vaciarCarrito } = useInventario()

  if (itemsCarrito.length === 0) {
    return (
      <>
        <TituloPagina titulo="Carrito de compras" />
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">Tu carrito está vacío.</p>
          <Link to="/articulos" className="mt-4 inline-block font-semibold text-emerald-700">Ver inventario →</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <TituloPagina titulo="Carrito de compras" subtitulo="Al cambiar cantidades, el stock del inventario se actualiza automáticamente." />
      <div className="grid gap-6 lg:grid-cols-3">
        <ul className="space-y-3 lg:col-span-2">
          {itemsCarrito.map((item) => (
            <li key={item.id} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link to={`/articulos/${item.id}`} className="font-semibold text-slate-900 hover:text-emerald-700">{item.nombre}</Link>
                <p className="text-sm text-slate-500">{item.marca} · {formatearPrecio(item.precio)} c/u</p>
                <p className="text-xs text-slate-400">Quedan {item.stock} en inventario</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <SelectorCantidad
                  cantidad={item.cantidad}
                  onDisminuir={() => disminuirCantidad(item.id)}
                  onAumentar={() => aumentarCantidad(item.id)}
                  puedeAumentar={item.stock > 0}
                />
                <p className="w-24 text-right font-semibold tabular-nums">{formatearPrecio(item.precio * item.cantidad)}</p>
                <button onClick={() => quitarDelCarrito(item.id)} className="text-sm font-medium text-rose-600 hover:underline">
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Resumen</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-slate-600">Unidades</dt><dd className="font-medium">{totalUnidades}</dd></div>
            <div className="flex justify-between border-t border-slate-100 pt-2 text-base">
              <dt className="font-semibold">Total</dt><dd className="font-bold text-emerald-700">{formatearPrecio(totalPagar)}</dd>
            </div>
          </dl>
          <Boton variante="peligro" className="mt-6 w-full" onClick={vaciarCarrito}>
            Vaciar carrito (devolver al stock)
          </Boton>
        </aside>
      </div>
    </>
  )
}
