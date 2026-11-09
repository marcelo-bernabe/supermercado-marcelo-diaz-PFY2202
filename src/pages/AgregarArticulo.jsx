import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TituloPagina from '../components/TituloPagina.jsx'
import Boton from '../components/Boton.jsx'
import { useInventario } from '../context/InventarioContext.jsx'
import { CATEGORIAS } from '../data/productosIniciales.js'

const FORMULARIO_VACIO = { nombre: '', marca: '', tipo: CATEGORIAS[0], precio: '', stock: '', descripcion: '' }

function Campo({ etiqueta, error, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {etiqueta}
      {children}
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  )
}

export default function AgregarArticulo() {
  const { agregarProducto } = useInventario()
  const navigate = useNavigate()
  const [form, setForm] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})

  const estiloCampo = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'

  const actualizar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validar = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Ingresa el nombre.'
    if (!form.marca.trim()) e.marca = 'Ingresa la marca.'
    if (!(Number(form.precio) > 0)) e.precio = 'El precio debe ser mayor a 0.'
    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0 || form.stock === '')
      e.stock = 'El stock debe ser un número entero mayor o igual a 0.'
    return e
  }

  const manejarEnvio = (evento) => {
    evento.preventDefault()
    const e = validar()
    setErrores(e)
    if (Object.keys(e).length > 0) return
    agregarProducto({
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      tipo: form.tipo,
      precio: Number(form.precio),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim(),
    })
    navigate('/articulos')
  }

  return (
    <>
      <TituloPagina titulo="Agregar artículo" subtitulo="Ingresa un nuevo producto al inventario." />
      <form onSubmit={manejarEnvio} noValidate className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
        <Campo etiqueta="Nombre" error={errores.nombre}>
          <input name="nombre" value={form.nombre} onChange={actualizar} className={estiloCampo} />
        </Campo>
        <Campo etiqueta="Marca" error={errores.marca}>
          <input name="marca" value={form.marca} onChange={actualizar} className={estiloCampo} />
        </Campo>
        <Campo etiqueta="Tipo de producto">
          <select name="tipo" value={form.tipo} onChange={actualizar} className={estiloCampo}>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Campo>
        <Campo etiqueta="Precio (CLP)" error={errores.precio}>
          <input name="precio" type="number" min="1" value={form.precio} onChange={actualizar} className={estiloCampo} />
        </Campo>
        <Campo etiqueta="Stock inicial" error={errores.stock}>
          <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={actualizar} className={estiloCampo} />
        </Campo>
        <Campo etiqueta="Descripción (opcional)">
          <input name="descripcion" value={form.descripcion} onChange={actualizar} className={estiloCampo} />
        </Campo>
        <div className="flex gap-3 sm:col-span-2">
          <Boton type="submit">Guardar artículo</Boton>
          <Boton type="button" variante="secundario" onClick={() => { setForm(FORMULARIO_VACIO); setErrores({}) }}>
            Limpiar
          </Boton>
        </div>
      </form>
    </>
  )
}
