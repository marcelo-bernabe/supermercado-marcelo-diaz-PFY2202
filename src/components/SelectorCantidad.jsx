// Control − / + reutilizable (detalle de artículo y carrito)
export default function SelectorCantidad({ cantidad, onDisminuir, onAumentar, puedeDisminuir = true, puedeAumentar = true }) {
  const estiloBoton =
    'h-9 w-9 rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40'
  return (
    <div className="inline-flex items-center gap-2">
      <button type="button" className={estiloBoton} onClick={onDisminuir} disabled={!puedeDisminuir} aria-label="Disminuir cantidad">
        −
      </button>
      <span className="w-8 text-center font-semibold tabular-nums">{cantidad}</span>
      <button type="button" className={estiloBoton} onClick={onAumentar} disabled={!puedeAumentar} aria-label="Aumentar cantidad">
        +
      </button>
    </div>
  )
}
