import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import Contactanos from './pages/Contactanos.jsx'
import AgregarArticulo from './pages/AgregarArticulo.jsx'
import ListaArticulos from './pages/ListaArticulos.jsx'
import DetalleArticulo from './pages/DetalleArticulo.jsx'
import Carrito from './pages/Carrito.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Semana 1: home + páginas informativas (menú inferior) */}
        <Route index element={<Home />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="contactanos" element={<Contactanos />} />

        {/* Semana 2: gestión de inventario (menú superior) */}
        <Route path="agregar" element={<AgregarArticulo />} />
        <Route path="articulos" element={<ListaArticulos />} />

        {/* Semana 3: detalle de artículo y carrito */}
        <Route path="articulos/:id" element={<DetalleArticulo />} />
        <Route path="carrito" element={<Carrito />} />

        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}
