import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Boton from '../components/Boton.jsx'
import IndicadorStock from '../components/IndicadorStock.jsx'
import SelectorCantidad from '../components/SelectorCantidad.jsx'
import { useInventario } from '../context/InventarioContext.jsx'
import { formatearPrecio } from '../utils/formato.js'

export default function DetalleArticulo() {
  const { id } = useParams()
  const { productos, itemsCarrito, agregarAlCarrito } = useInventario()
  const producto = productos.find((p) => p.id === Number(id))
  const enCarrito = itemsCarrito.find((i) => i.id === Number(id))?.cantidad ?? 0

  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  // Si el stock baja, la cantidad elegida nunca puede superarlo
  useEffect(() => {
    if (producto && cantidad > producto.stock) setCantidad(Math.max(1, producto.stock))
  }, [producto, cantidad])

  if (!producto) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-600">El artículo solicitado no existe.</p>
        <Link to="/articulos" className="mt-4 inline-block font-semibold text-emerald-700">← Volver al inventario</Link>
      </div>
    )
  }

  const agotado = producto.stock === 0

  const manejarAgregar = () => {
    agregarAlCarrito(producto.id, cantidad)
    setMensaje(`Se agregaron ${cantidad} unidad(es) al carrito.`)
    setCantidad(1)
  }

  return (
    <>
      <Link to="/articulos" className="text-sm font-semibold text-emerald-700 hover:underline">← Volver al inventario</Link>
      <article className="mt-4 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-xl bg-emerald-50 text-7xl" aria-hidden="true">
          🛍️
        </div>
        <div className="flex flex-col">
          <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{producto.tipo}</span>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{producto.nombre}</h1>
          <p className="mt-1 text-slate-500">Marca: {producto.marca}</p>
          <p className="mt-4 text-3xl font-bold text-emerald-700">{formatearPrecio(producto.precio)}</p>
          {producto.descripcion && <p className="mt-4 text-slate-700">{producto.descripcion}</p>}

          <div className="mt-4 flex items-center gap-3 text-sm">
            <IndicadorStock stock={producto.stock} />
            {enCarrito > 0 && <span className="text-slate-500">Tienes {enCarrito} en el carrito</span>}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <SelectorCantidad
              cantidad={agotado ? 0 : cantidad}
              onDisminuir={() => setCantidad((c) => c - 1)}
              onAumentar={() => setCantidad((c) => c + 1)}
              puedeDisminuir={!agotado && cantidad > 1}
              puedeAumentar={!agotado && cantidad < producto.stock}
            />
            <Boton onClick={manejarAgregar} disabled={agotado}>
              {agotado ? 'Sin stock' : 'Agregar al carrito'}
            </Boton>
          </div>

          {mensaje && (
            <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-800" role="status">
              {mensaje} <Link to="/carrito" className="font-semibold underline">Ir al carrito</Link>
            </p>
          )}
        </div>
      </article>
    </>
  )
}
