import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold text-emerald-600">404</p>
      <p className="mt-2 text-slate-600">La página que buscas no existe.</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-emerald-700">← Volver al inicio</Link>
    </div>
  )
}
