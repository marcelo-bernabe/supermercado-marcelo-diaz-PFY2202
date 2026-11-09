import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../components/TituloPagina.jsx'
import FiltroCategoria from '../components/FiltroCategoria.jsx'
import TablaArticulos from '../components/TablaArticulos.jsx'
import { useInventario } from '../context/InventarioContext.jsx'

export default function ListaArticulos() {
  const { productos } = useInventario()
  // Estado del filtro: solo guarda la categoría seleccionada.
  // La lista filtrada se DERIVA de "productos", por lo que el inventario
  // original del estado global nunca se modifica ni se pierde.
  const [categoria, setCategoria] = useState('Todas')

  const articulosFiltrados = useMemo(
    () => (categoria === 'Todas' ? productos : productos.filter((p) => p.tipo === categoria)),
    [productos, categoria],
  )

  // Cantidad de artículos por categoría, para mostrar en el filtro
  const conteos = useMemo(() => {
    const c = { Todas: productos.length }
    productos.forEach((p) => { c[p.tipo] = (c[p.tipo] ?? 0) + 1 })
    return c
  }, [productos])

  return (
    <>
      <TituloPagina
        titulo="Inventario"
        subtitulo={`Mostrando ${articulosFiltrados.length} de ${productos.length} artículos. Haz clic en uno para ver su detalle.`}
      >
        <Link to="/agregar" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
          + Agregar artículo
        </Link>
      </TituloPagina>
      <FiltroCategoria seleccionada={categoria} onCambiar={setCategoria} conteos={conteos} />
      <TablaArticulos articulos={articulosFiltrados} />
    </>
  )
}
