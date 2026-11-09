import { Link } from 'react-router-dom'
import { useInventario } from '../context/InventarioContext.jsx'

function Tarjeta({ to, icono, titulo, texto }) {
  return (
    <Link to={to} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="text-3xl">{icono}</div>
      <h2 className="mt-3 text-lg font-semibold text-slate-900">{titulo}</h2>
      <p className="mt-1 text-sm text-slate-600">{texto}</p>
    </Link>
  )
}

export default function Home() {
  const { productos, totalUnidades } = useInventario()
  const stockTotal = productos.reduce((s, p) => s + p.stock, 0)

  return (
    <>
      <section className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 px-6 py-12 text-white sm:px-10">
        <h1 className="text-3xl font-bold sm:text-4xl">Gestión de inventario FrescoMarket</h1>
        <p className="mt-3 max-w-2xl text-emerald-50">
          Administra los artículos del supermercado, revisa el stock disponible y arma el carrito de compras.
        </p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <p><span className="block text-2xl font-bold">{productos.length}</span>artículos</p>
          <p><span className="block text-2xl font-bold">{stockTotal}</span>unidades en stock</p>
          <p><span className="block text-2xl font-bold">{totalUnidades}</span>en el carrito</p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Tarjeta to="/agregar" icono="➕" titulo="Agregar artículo" texto="Ingresa nuevos productos al inventario." />
        <Tarjeta to="/articulos" icono="📋" titulo="Inventario" texto="Lista, filtra por categoría y revisa el detalle." />
        <Tarjeta to="/carrito" icono="🛒" titulo="Carrito" texto="Ajusta cantidades; el stock se actualiza solo." />
      </section>
    </>
  )
}
