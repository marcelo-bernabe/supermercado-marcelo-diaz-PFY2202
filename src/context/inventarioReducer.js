// Reducer puro: toda la lógica de inventario y carrito vive aquí.
// Regla principal: cada unidad en el carrito se descuenta del stock,
// y cada unidad que sale del carrito vuelve al stock.

export const ACCIONES = {
  AGREGAR_PRODUCTO: 'AGREGAR_PRODUCTO',
  AGREGAR_AL_CARRITO: 'AGREGAR_AL_CARRITO',
  AUMENTAR_CANTIDAD: 'AUMENTAR_CANTIDAD',
  DISMINUIR_CANTIDAD: 'DISMINUIR_CANTIDAD',
  QUITAR_DEL_CARRITO: 'QUITAR_DEL_CARRITO',
  VACIAR_CARRITO: 'VACIAR_CARRITO',
}

// Ajusta el stock de un producto en "delta" unidades (sin mutar el arreglo)
function ajustarStock(productos, id, delta) {
  return productos.map((p) => (p.id === id ? { ...p, stock: p.stock + delta } : p))
}

// Ajusta la cantidad en el carrito; elimina el ítem si llega a 0
function ajustarCarrito(carrito, id, delta) {
  const existe = carrito.some((item) => item.id === id)
  if (!existe) return delta > 0 ? [...carrito, { id, cantidad: delta }] : carrito
  return carrito
    .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + delta } : item))
    .filter((item) => item.cantidad > 0)
}

export function inventarioReducer(estado, accion) {
  switch (accion.type) {
    case ACCIONES.AGREGAR_PRODUCTO: {
      const siguienteId = Math.max(0, ...estado.productos.map((p) => p.id)) + 1
      return { ...estado, productos: [...estado.productos, { ...accion.payload, id: siguienteId }] }
    }

    case ACCIONES.AGREGAR_AL_CARRITO:
    case ACCIONES.AUMENTAR_CANTIDAD: {
      const { id } = accion.payload
      const cantidad = accion.payload.cantidad ?? 1
      const producto = estado.productos.find((p) => p.id === id)
      // Validación: no se puede pedir más de lo disponible
      if (!producto || cantidad <= 0 || cantidad > producto.stock) return estado
      return {
        productos: ajustarStock(estado.productos, id, -cantidad),
        carrito: ajustarCarrito(estado.carrito, id, cantidad),
      }
    }

    case ACCIONES.DISMINUIR_CANTIDAD: {
      const { id } = accion.payload
      if (!estado.carrito.some((item) => item.id === id)) return estado
      return {
        productos: ajustarStock(estado.productos, id, 1),
        carrito: ajustarCarrito(estado.carrito, id, -1),
      }
    }

    case ACCIONES.QUITAR_DEL_CARRITO: {
      const { id } = accion.payload
      const item = estado.carrito.find((i) => i.id === id)
      if (!item) return estado
      return {
        productos: ajustarStock(estado.productos, id, item.cantidad),
        carrito: estado.carrito.filter((i) => i.id !== id),
      }
    }

    case ACCIONES.VACIAR_CARRITO: {
      // Devuelve todas las unidades del carrito al inventario
      const productos = estado.carrito.reduce(
        (lista, item) => ajustarStock(lista, item.id, item.cantidad),
        estado.productos,
      )
      return { productos, carrito: [] }
    }

    default:
      return estado
  }
}
