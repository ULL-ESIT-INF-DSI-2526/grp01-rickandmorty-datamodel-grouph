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
   * @param species - Species que queremos añadir
   */
  async add(species: Species): Promise<void> {
    const existingSpecies = database.data.especies.find(spec => {
      const specId = (spec as any)._id;
      return specId === species.id;
    });
    if (existingSpecies) throw new Error(`La especie con id ${species.id} ya existe.`);
    database.data.especies.push(species);
    await database.write()
    console.log(`Especie ${species.name} añadida correctamente.`);
  }

  /**
   * Elimina la especie con identificador igual a id de la base de datos
   * @param id - id de la especie que queremos eliminar
   */
  async delete(id: string): Promise<void> {
    const index = database.data.especies.findIndex(spec => {
      const specId = (spec as any)._id;
      return specId === id;
    });
    if (index === -1) throw new Error(`La especie con id ${id} no existe.`);
    database.data.especies.splice(index, 1);
    await database.write()
    console.log(`Especie eliminada correctamente.`);
  }

  /**
   * Devuelve la especie cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de la especie que queremos leer
   * @returns La especie con el identificador igual a id
   */
  read(id: string): Species | undefined {
    return database.data.especies.find(spec => {
      const specId = (spec as any)._id;
      return specId === id;
    });
  }

  /**
   * Actualiza el estado de una especie en la base de datos
   * @param id - id de la especie que queremos actualizar
   * @param newSpecies - Nuevo estado de la especie
   */
  async update(id: string, newSpecies: Species): Promise <void> {
    const index = database.data.especies.findIndex(spec => {
      const specId = (spec as any)._id;
      return specId === id;
    });
    if (index === -1) throw new Error(`La especie con id ${id} no existe.`);
    database.data.especies[index] = newSpecies;
    await database.write();
    console.log(`Especie actualizada correctamente.`);
  }
}