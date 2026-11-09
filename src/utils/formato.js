const formateador = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })

export const formatearPrecio = (valor) => formateador.format(valor)
