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
   * @param location - Location que queremos añadir
   */
  public async add(location: Location): Promise<void> {
    const existingLocation = database.data.localizaciones.find(loc => {
      const locId = (loc as any)._id;
      return locId === location.id;
    });
    if (existingLocation) throw new Error(`La localización con id ${location.id} ya existe.`);
    database.data.localizaciones.push(location);
    await database.write();
    console.log(`Localización ${location.name} añadida correctamente.`);
  }

  /**
   * Elimina la localización con identificador igual a id de la base de datos
   * @param id - id de la localización que queremos eliminar
   */
  public async delete(id: string): Promise<void> {
    const index = database.data.localizaciones.findIndex(loc => {
      const locId = (loc as any)._id;
      return locId === id;
    });
    if (index === -1) throw new Error(`La localización con id ${id} no existe.`);
    database.data.localizaciones.splice(index, 1);
    await database.write();
    console.log(`Localización eliminada correctamente.`);
  }

  /**
   * Devuelve la localización cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de la localización que queremos leer
   * @returns La localización con el identificador igual a id
   */
  public read(id: string): Location | undefined {
    return database.data.localizaciones.find(loc => {
      const locId = (loc as any)._id;
      return locId === id;
    });
  }

  /**
   * Actualiza el estado de una localización en la base de datos
   * @param id - id de la localización que queremos actualizar
   * @param newLocation - Nuevo estado de la localización
   */
  public async update(id: string, newLocation: Location): Promise<void> {
    const index = database.data.localizaciones.findIndex(loc => {
      const locId = (loc as any)._id;
      return locId === id;
    });
    if (index === -1) throw new Error(`La localización con id ${id} no existe.`);
    database.data.localizaciones[index] = newLocation;
    await database.write();
    console.log(`Localización actualizada correctamente.`);
  }
}