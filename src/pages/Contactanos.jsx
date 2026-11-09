import { useState } from 'react'
import TituloPagina from '../components/TituloPagina.jsx'
import Boton from '../components/Boton.jsx'

export default function Contactanos() {
  const [enviado, setEnviado] = useState(false)
  const estiloCampo = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200'

  const manejarEnvio = (e) => {
    e.preventDefault()
    setEnviado(true)
    e.target.reset()
  }

  return (
    <>
      <TituloPagina titulo="Contáctanos" subtitulo="Escríbenos y te responderemos a la brevedad." />
      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={manejarEnvio} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <label className="block text-sm font-medium text-slate-700">
            Nombre
            <input required name="nombre" className={estiloCampo} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Correo electrónico
            <input required type="email" name="correo" className={estiloCampo} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Mensaje
            <textarea required name="mensaje" rows="4" className={estiloCampo} />
          </label>
          <Boton type="submit">Enviar mensaje</Boton>
          {enviado && <p className="text-sm font-medium text-emerald-700">¡Gracias! Recibimos tu mensaje.</p>}
        </form>
        <aside className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-sm">
          <p><strong>Teléfono:</strong> +56 2 2345 6789</p>
          <p><strong>Correo:</strong> contacto@frescomarket.cl</p>
          <p><strong>Horario:</strong> lunes a domingo, 8:30 a 22:00</p>
          <p><strong>Dirección:</strong> Av. Principal 1234, Santiago</p>
        </aside>
      </div>
    </>
  )
}
