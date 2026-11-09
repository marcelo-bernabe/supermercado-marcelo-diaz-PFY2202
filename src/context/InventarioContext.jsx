import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { PRODUCTOS_INICIALES } from '../data/productosIniciales.js'
import { ACCIONES, inventarioReducer } from './inventarioReducer.js'

const InventarioContext = createContext(null)
const CLAVE_STORAGE = 'frescomarket-estado'

// Carga el estado guardado (si existe) para no perder datos al recargar
function estadoInicial() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE))
    if (guardado?.productos && guardado?.carrito) return guardado
  } catch {
    /* sin datos guardados o almacenamiento no disponible */
  }
  return { productos: PRODUCTOS_INICIALES, carrito: [] }
}

export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(inventarioReducer, undefined, estadoInicial)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estado))
    } catch {
      /* se ignora si el navegador bloquea el almacenamiento */
    }
  }, [estado])

  // Ítems del carrito con los datos del producto ya resueltos
  const itemsCarrito = useMemo(
    () =>
      estado.carrito.map((item) => ({
        ...estado.productos.find((p) => p.id === item.id),
        cantidad: item.cantidad,
      })),
    [estado],
  )

  const totalUnidades = itemsCarrito.reduce((suma, i) => suma + i.cantidad, 0)
  const totalPagar = itemsCarrito.reduce((suma, i) => suma + i.cantidad * i.precio, 0)

  const valor = {
    productos: estado.productos,
    itemsCarrito,
    totalUnidades,
    totalPagar,
    agregarProducto: (producto) => dispatch({ type: ACCIONES.AGREGAR_PRODUCTO, payload: producto }),
    agregarAlCarrito: (id, cantidad) => dispatch({ type: ACCIONES.AGREGAR_AL_CARRITO, payload: { id, cantidad } }),
    aumentarCantidad: (id) => dispatch({ type: ACCIONES.AUMENTAR_CANTIDAD, payload: { id } }),
    disminuirCantidad: (id) => dispatch({ type: ACCIONES.DISMINUIR_CANTIDAD, payload: { id } }),
    quitarDelCarrito: (id) => dispatch({ type: ACCIONES.QUITAR_DEL_CARRITO, payload: { id } }),
    vaciarCarrito: () => dispatch({ type: ACCIONES.VACIAR_CARRITO }),
  }

  return <InventarioContext.Provider value={valor}>{children}</InventarioContext.Provider>
}

// Hook personalizado para consumir el estado global
export function useInventario() {
  const contexto = useContext(InventarioContext)
  if (!contexto) throw new Error('useInventario debe usarse dentro de <InventarioProvider>')
  return contexto
}
