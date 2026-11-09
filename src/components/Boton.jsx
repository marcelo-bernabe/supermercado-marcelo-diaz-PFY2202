// Botón reutilizable con variantes de estilo
const VARIANTES = {
  primario: 'bg-emerald-600 text-white hover:bg-emerald-700',
  secundario: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100',
  peligro: 'bg-rose-600 text-white hover:bg-rose-700',
}

export default function Boton({ variante = 'primario', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTES[variante]} ${className}`}
      {...props}
    />
  )
}
