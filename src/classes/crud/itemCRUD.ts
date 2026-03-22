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
  public async add(item: Item): Promise<void> {
    const existingItem = database.data.inventos.find(it => {
      const itemId = (it as any)._id;
      return itemId === item.id;
    });
    if (existingItem) throw new Error(`El invento con id ${item.id} ya existe.`);
    database.data.inventos.push(item);
    await database.write();
    console.log(`Invento: ${item.name} añadido correctamente.`);
  }

  /**
   * Elimina el invento con identificador igual a id de la base de datos
   * @param id - id de el invento que queremos eliminar
   */
  public async delete(id: string): Promise<void> {
    const index = database.data.inventos.findIndex(it => {
      const itemId = (it as any)._id;
      return itemId === id;
    });
    if (index === -1) throw new Error(`El invento con id ${id} no existe.`);
    database.data.inventos.splice(index, 1);
    await database.write();
    console.log(`Invento eliminado correctamente.`);
  }

  /**
   * Devuelve el invento cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de el invento que queremos leer
   * @returns el invento con el identificador igual a id
   */
  public read(id: string): Item | undefined {
    return database.data.inventos.find(it => {
      const itemId = (it as any)._id;
      return itemId === id;
    });
  }

  /**
   * Actualiza el estado de una invento en la base de datos
   * @param id - id de el invento que queremos actualizar
   * @param newItem - Nuevo estado de el invento
   */
  public async update(id: string, newItem: Item): Promise<void> {
    const index = database.data.inventos.findIndex(it => {
      const itemId = (it as any)._id;
      return itemId === id;
    });
    if (index === -1) throw Error(`El invento con id ${id} no existe`);
    database.data.inventos[index] = newItem;
    await database.write();
    console.log(`Invento actualizado correctamente.`);
  }
}