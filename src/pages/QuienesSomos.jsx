import TituloPagina from '../components/TituloPagina.jsx'

const VALORES = [
  { titulo: 'Frescura', texto: 'Productos que llegan a diario desde proveedores locales.' },
  { titulo: 'Precios justos', texto: 'Ofertas semanales y precios claros en cada góndola.' },
  { titulo: 'Cercanía', texto: 'Atención amable en cada una de nuestras tiendas.' },
]

export default function QuienesSomos() {
  return (
    <>
      <TituloPagina titulo="Quiénes somos" subtitulo="Un supermercado de barrio con más de 20 años de historia." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
          <p>
            FrescoMarket nació en 2004 como un pequeño almacén familiar. Hoy contamos con tiendas en distintas
            comunas y un equipo comprometido con ofrecer productos de calidad a buen precio.
          </p>
          <p>
            <strong>Misión:</strong> abastecer a las familias con productos frescos y de calidad, con una
            experiencia de compra simple y cercana.
          </p>
          <p>
            <strong>Visión:</strong> ser el supermercado de barrio preferido por la comunidad.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {VALORES.map((v) => (
            <div key={v.titulo} className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h2 className="font-semibold text-emerald-800">{v.titulo}</h2>
              <p className="mt-1 text-sm text-emerald-900/80">{v.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
