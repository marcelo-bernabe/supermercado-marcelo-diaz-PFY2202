// Etiqueta de color según el stock disponible
export default function IndicadorStock({ stock }) {
  const estilo =
    stock === 0
      ? 'bg-rose-100 text-rose-700'
      : stock <= 5
        ? 'bg-amber-100 text-amber-800'
        : 'bg-emerald-100 text-emerald-700'
  const texto = stock === 0 ? 'Agotado' : `${stock} disp.`
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${estilo}`}>{texto}</span>
}
