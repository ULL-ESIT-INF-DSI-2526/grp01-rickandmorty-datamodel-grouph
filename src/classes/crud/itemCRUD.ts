import { CRUD } from "./isCRUD.js"
import { Item } from "../item.js"
import { database } from "../../db/db.js"

/**
 * Clase para gestionar operaciones CRUD para las inventos en la base de datos
 */
export class ItemCRUD extends CRUD<Item> {
  constructor() {
    super()
  }

  /**
   * Añade un nueva invento a la base de datos
   * @param item - Item que queremos añadir
   */
  add(item: Item): void {
    if (database.data.inventos.some(d => d.id === item.id)) throw new Error(`El invento con id ${item.id} ya existe.`)
    database.data.inventos.push(item)
  }

  /**
   * Elimina el invento con identificador igual a id de la base de datos
   * @param id - id de el invento que queremos eliminar
   */
  delete(id: string): void {
    const index = database.data.inventos.findIndex(d => d.id === id)
    if (index === -1) throw new Error(`El invento con id ${id} no existe.`)
    database.data.inventos.splice(index, 1)
  }

  /**
   * Devuelve el invento cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de el invento que queremos leer
   * @returns el invento con el identificador igual a id
   */
  read(id: string): Item {
    if (database.data.inventos.find(d => d.id === id) === undefined) throw new Error(`El invento con id ${id} no existe.`)
    return database.data.inventos.find(d => d.id === id) as Item
  }

  /**
   * Actualiza el estado de una invento en la base de datos
   * @param id - id de el invento que queremos actualizar
   * @param item - Nuevo estado de el invento
   */
  update(id: string, item: Item): void {
    const index = database.data.inventos.findIndex(d => d.id === id)
    if (index === -1) throw Error(`El invento con id ${id} no existe`)
    database.data.inventos[index] = item
  }
}