// Encabezado reutilizable para todas las páginas
export default function TituloPagina({ titulo, subtitulo, children }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{titulo}</h1>
        {subtitulo && <p className="mt-1 text-slate-600">{subtitulo}</p>}
      </div>
      {children}
    </div>
  )
}
