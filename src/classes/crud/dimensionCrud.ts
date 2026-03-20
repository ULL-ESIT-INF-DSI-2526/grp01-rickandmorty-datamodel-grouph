import { CRUD } from "./isCRUD.js"
import { Dimension } from "../dimension.js"
import { database } from "../../db/db.js"

/**
 * Clase para gestionar operaciones CRUD para las dimensiones en la base de datos
 */
export class DimensionCRUD extends CRUD<Dimension> {
  constructor() {
    super()
  }

  /**
   * Añade una nueva dimensión a la base de datos
   * @param item - Dimension que queremos añadir
   */
  add(item: Dimension): void {
    if (database.data.dimensiones.some(d => d.id === item.id)) throw new Error(`La dimensión con id ${item.id} ya existe.`)
    database.data.dimensiones.push(item)
  }

  /**
   * Elimina la dimensión con identificador igual a id de la base de datos.
   * Como consecuencia todas las localizaciones que pertenecen a esa dimensión también serán eliminadas.
   * @param id - id de la dimensión que queremos eliminar
   */
  delete(id: string): void {
    const index = database.data.dimensiones.findIndex(d => d.id === id)
    if (index === -1) throw new Error(`La dimensión con id ${id} no existe.`)
    database.data.dimensiones.splice(index, 1)
    database.data.localizaciones = database.data.localizaciones.filter(loc => loc.dimension.id !== id)
  }
  /**
   * Devuelve la dimensión cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de la dimensión que queremos leer
   * @returns La dimensión con el identificador igual a id
   */
  read(id: string): Dimension {
    if (database.data.dimensiones.find(d => d.id === id) === undefined) throw new Error(`La dimensión con id ${id} no existe.`)
    return database.data.dimensiones.find(d => d.id === id) as Dimension
  }

  /**
   * Actualiza el estado de una dimensión en la base de datos
   * @param id - id de la dimensión que queremos actualizar
   * @param item - Nuevo estado de la dimensión
   */
  update(id: string, item: Dimension): void {
    const index = database.data.dimensiones.findIndex(d => d.id === id)
    if (index === -1) throw Error(`La dimensión con id ${id} no existe`)
    database.data.dimensiones[index] = item
  }
}