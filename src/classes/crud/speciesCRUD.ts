import { CRUD } from "./isCRUD.js"
import { Species } from "../species.js"
import { database } from "../../db/db.js"

/**
 * Clase para gestionar operaciones CRUD para las especies en la base de datos
 */
export class SpeciesCRUD extends CRUD<Species> {
  constructor() {
    super()
  }

  /**
   * Añade una nueva especie a la base de datos
   * @param item - Species que queremos añadir
   */
  add(item: Species): void {
    if (database.data.especies.some(d => d.id === item.id)) throw new Error(`La especie con id ${item.id} ya existe.`)
    database.data.especies.push(item)
  }

  /**
   * Elimina la especie con identificador igual a id de la base de datos
   * @param id - id de la especie que queremos eliminar
   */
  delete(id: string): void {
    const index = database.data.especies.findIndex(d => d.id === id)
    if (index === -1) throw new Error(`La especie con id ${id} no existe.`)
    database.data.especies.splice(index, 1)
  }

  /**
   * Devuelve la especie cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de la especie que queremos leer
   * @returns La especie con el identificador igual a id
   */
  read(id: string): Species {
    if (database.data.especies.find(d => d.id === id) === undefined) throw new Error(`La especie con id ${id} no existe.`)
    return database.data.especies.find(d => d.id === id) as Species
  }

  /**
   * Actualiza el estado de una especie en la base de datos
   * @param id - id de la especie que queremos actualizar
   * @param item - Nuevo estado de la especie
   */
  update(id: string, item: Species): void {
    const index = database.data.especies.findIndex(d => d.id === id)
    if (index === -1) throw Error(`La especie con id ${id} no existe`)
    database.data.especies[index] = item
  }
}