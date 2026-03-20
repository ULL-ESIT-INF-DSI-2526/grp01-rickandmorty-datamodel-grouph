import { CRUD } from "./isCRUD.js"
import { Location } from "../location.js"
import { database } from "../../db/db.js"

/**
 * Clase para gestionar operaciones CRUD para las localizaciones en la base de datos
 */
export class LocationCRUD extends CRUD<Location> {
  constructor() {
    super()
  }

  /**
   * Añade una nueva localización a la base de datos
   * @param item - Location que queremos añadir
   */
  add(item: Location): void {
    if (database.data.localizaciones.some(d => d.id === item.id)) throw new Error(`La localización con id ${item.id} ya existe.`)
    database.data.localizaciones.push(item)
  }

  /**
   * Elimina la localización con identificador igual a id de la base de datos
   * @param id - id de la localización que queremos eliminar
   */
  delete(id: string): void {
    const index = database.data.localizaciones.findIndex(d => d.id === id)
    if (index === -1) throw new Error(`La localización con id ${id} no existe.`)
    database.data.localizaciones.splice(index, 1)
  }

  /**
   * Devuelve la localización cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de la localización que queremos leer
   * @returns La localización con el identificador igual a id
   */
  read(id: string): Location {
    if (database.data.localizaciones.find(d => d.id === id) === undefined) throw new Error(`La localización con id ${id} no existe.`)
    return database.data.localizaciones.find(d => d.id === id) as Location
  }

  /**
   * Actualiza el estado de una localización en la base de datos
   * @param id - id de la localización que queremos actualizar
   * @param item - Nuevo estado de la localización
   */
  update(id: string, item: Location): void {
    const index = database.data.localizaciones.findIndex(d => d.id === id)
    if (index === -1) throw Error(`La localización con id ${id} no existe`)
    database.data.localizaciones[index] = item
  }
}