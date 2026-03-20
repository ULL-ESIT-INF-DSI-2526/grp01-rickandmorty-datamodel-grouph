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
  async add(item: Item): Promise<void> {
    if (database.data.inventos.some(d => d.id === item.id)) throw new Error(`El invento con id ${item.id} ya existe.`)
    database.data.inventos.push(item)
    await database.write()
  }

  /**
   * Elimina el invento con identificador igual a id de la base de datos
   * @param id - id de el invento que queremos eliminar
   */
  async delete(id: string): Promise<void> {
    const index = database.data.inventos.findIndex(d => d.id === id)
    if (index === -1) throw new Error(`El invento con id ${id} no existe.`)
    database.data.inventos.splice(index, 1)
    await database.write();
  }

  /**
   * Devuelve el invento cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de el invento que queremos leer
   * @returns el invento con el identificador igual a id
   */
  read(id: string): Item {
    const item = database.data.inventos.find(d => d.id === id)
    if (!item) throw new Error(`El invento con id ${id} no existe.`)
    return item
  }

  /**
   * Actualiza el estado de una invento en la base de datos
   * @param id - id de el invento que queremos actualizar
   * @param item - Nuevo estado de el invento
   */
  async update(id: string, item: Item): Promise<void> {
    const index = database.data.inventos.findIndex(d => d.id === id);
    if (index === -1) throw Error(`El invento con id ${id} no existe`);
    database.data.inventos[index] = item;
    await database.write();
  }
}