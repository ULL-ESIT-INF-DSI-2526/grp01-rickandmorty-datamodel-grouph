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
   * @param character - Character que queremos añadir
   */
  public async add(character: Character): Promise<void> {
    const exisingCharacter = database.data.personajes.find(pj => {
      const pjId = (pj as any)._id;
      return pjId === character.id;
    });
    if (exisingCharacter) throw new Error(`El personaje con id ${character.id} ya existe.`)
    database.data.personajes.push(character)
    await database.write()
      
  }

  /**
   * Elimina el personaje con identificador igual a id de la base de datos
   * @param id - id de el personaje que queremos eliminar
   */
  public async delete(id: string): Promise<void> {
    const index = database.data.personajes.findIndex(pj => {
      const pjId = (pj as any)._id;
      return pjId === id;
    });
    if (index === -1) throw new Error(`El personaje con id ${id} no existe.`);
    database.data.personajes.splice(index, 1);
    await database.write();
  }

  /**
   * Devuelve el personaje cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de el personaje que queremos leer
   * @returns el personaje con el identificador igual a id
   */
  public read(id: string): Character | undefined {
    return database.data.personajes.find(pj => {
      const pjId = (pj as any)._id;
      return pjId === id;
    });
  }

  /**
   * Actualiza el estado de un personaje en la base de datos
   * @param id - id de el personaje que queremos actualizar
   * @param characterUpdated - Nuevo estado de la dimensión
   */
  public async update(id: string, characterUpdated: Character): Promise<void> {
    const index = database.data.personajes.findIndex(pj => {
      const pjId = (pj as any)._id;
      return pjId === id;
    });
    if (index === -1) throw new Error(`El personaje con id ${id} no existe.`);
    database.data.personajes[index] = characterUpdated;
    await database.write();
  }
}