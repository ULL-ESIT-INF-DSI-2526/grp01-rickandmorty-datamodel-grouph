import { CRUD } from "./isCRUD.js"
import { Character } from "../character.js"
import { database } from "../../db/db.js"

/**
 * Clase para gestionar operaciones CRUD para las personajes en la base de datos
 */
export class CharacterCRUD extends CRUD<Character> {
  constructor() {
    super()
  }

  /**
   * Añade un nuevo personaje a la base de datos
   * @param item - Character que queremos añadir
   */
  add(item: Character): void {
    if (database.data.personajes.some(d => d.id === item.id)) throw new Error(`El personaje con id ${item.id} ya existe.`)
    database.data.personajes.push(item)
  }

  /**
   * Elimina el personaje con identificador igual a id de la base de datos
   * @param id - id de el personaje que queremos eliminar
   */
  delete(id: string): void {
    const index = database.data.personajes.findIndex(d => d.id === id)
    if (index === -1) throw new Error(`El personaje con id ${id} no existe.`)
    database.data.personajes.splice(index, 1)
  }

  /**
   * Devuelve el personaje cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de el personaje que queremos leer
   * @returns el personaje con el identificador igual a id
   */
  read(id: string): Character {
    if (database.data.personajes.find(d => d.id === id) === undefined) throw new Error(`El personaje con id ${id} no existe.`)
    return database.data.personajes.find(d => d.id === id) as Character
  }

  /**
   * Actualiza el estado de un personaje en la base de datos
   * @param id - id de el personaje que queremos actualizar
   * @param item - Nuevo estado de la dimensión
   */
  update(id: string, item: Character): void {
    const index = database.data.personajes.findIndex(d => d.id === id)
    if (index === -1) throw Error(`El personaje con id ${id} no existe`)
    database.data.personajes[index] = item
  }
}