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
  async add(item: Species): Promise<void> {
    if (database.data.especies.some(d => d.id === item.id)) throw new Error(`La especie con id ${item.id} ya existe.`)
    database.data.especies.push(item)
    await database.write()
  }

  /**
   * Elimina la especie con identificador igual a id de la base de datos
   * @param id - id de la especie que queremos eliminar
   */
  async delete(id: string): Promise<void> {
    const index = database.data.especies.findIndex(d => d.id === id)
    if (index === -1) throw new Error(`La especie con id ${id} no existe.`)
    database.data.especies.splice(index, 1)
    await database.write()
  }

  /**
   * Devuelve la especie cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de la especie que queremos leer
   * @returns La especie con el identificador igual a id
   */
  read(id: string): Species {
    const species = database.data.especies.find(d => d.id === id)
    if (!species) throw new Error(`La especie con id ${id} no existe.`)
    return species
  }

  /**
   * Actualiza el estado de una especie en la base de datos
   * @param id - id de la especie que queremos actualizar
   * @param item - Nuevo estado de la especie
   */
  async update(id: string, item: Species): Promise <void> {
    const index = database.data.especies.findIndex(d => d.id === id)
    if (index === -1) throw Error(`La especie con id ${id} no existe`)
    database.data.especies[index] = item
    await database.write()
  }
}