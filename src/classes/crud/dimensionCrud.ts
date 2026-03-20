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
  async add(item: Dimension): Promise<void> {
    if (database.data.dimensiones.some(d => d.id === item.id)) throw new Error(`La dimensión con id ${item.id} ya existe.`)
    database.data.dimensiones.push(item)
    await database.write()
  }

  /**
   * Elimina la dimensión con identificador igual a id de la base de datos.
   * Como consecuencia todas las localizaciones que pertenecen a esa dimensión también serán eliminadas.
   * @param id - id de la dimensión que queremos eliminar
   */
  async delete(id: string): Promise<void> {
    const index = database.data.dimensiones.findIndex(d => d.id === id)
    if (index === -1) throw new Error(`La dimensión con id ${id} no existe.`)
    database.data.dimensiones.splice(index, 1)
    database.data.localizaciones = database.data.localizaciones.filter(loc => loc.dimension.id !== id)
    await database.write()
  }
  /**
   * Devuelve la dimensión cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de la dimensión que queremos leer
   * @returns La dimensión con el identificador igual a id
   */
  read(id: string): Dimension {
    const dimension = database.data.dimensiones.find(d => d.id === id)
    if (!dimension) throw new Error(`La dimensión con id ${id} no existe.`)
    return dimension
  }

  /**
   * Actualiza el estado de una dimensión en la base de datos
   * @param id - id de la dimensión que queremos actualizar
   * @param item - Nuevo estado de la dimensión
   */
  async update(id: string, item: Dimension): Promise<void> {
    const index = database.data.dimensiones.findIndex(d => d.id === id)
    if (index === -1) throw Error(`La dimensión con id ${id} no existe`)
    database.data.dimensiones[index] = item
    await database.write()
  }
}