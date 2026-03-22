import { CRUD } from "./isCRUD.js"
import { Dimension } from "../dimension.js"
import { database } from "../../db/db.js"

/**
 * Clase para gestionar operaciones CRUD para las dimensiones en la base de datos
 */
export class DimensionCRUD extends CRUD<Dimension> {
  constructor() {
    super()
  }

  /**
   * Añade una nueva dimensión a la base de datos
   * @param dimension - Dimension que queremos añadir
   */
  public async add(dimension: Dimension): Promise<void> {
    const existingDimension = database.data.dimensiones.find(dim => {
      const dimId = (dim as any)._id;
      return dimId === dimension.id;
    });
    if (existingDimension) throw new Error("La dimensión ya existe.");
    database.data.dimensiones.push(dimension);
    await database.write();
    console.log(`Dimensión ${dimension.id} añadida correctamente.`);
  }

  /**
   * Elimina la dimensión con identificador igual a id de la base de datos.
   * Como consecuencia todas las localizaciones que pertenecen a esa dimensión también serán eliminadas.
   * @param id - id de la dimensión que queremos eliminar
   */
  public async delete(id: string): Promise<void> {
    const index = database.data.dimensiones.findIndex(dim => {
      const dimId = (dim as any)._id;
      return dimId === id;
    });
    if (index === -1) throw new Error(`La dimensión con id ${id} no existe.`);
    database.data.dimensiones.splice(index, 1);
    database.data.localizaciones = database.data.localizaciones.filter(loc => {
      const locDim = (loc as any)._dimension;
      const locDimId = locDim.id || locDim._id;
      return locDimId !== id; 
    });
    await database.write();
    console.log(`Dimensión ${id} eliminada correctamente.`);
  }
  /**
   * Devuelve la dimensión cuyo id se pasa por parámetro de la base de datos
   * @param id - identificador de la dimensión que queremos leer
   * @returns La dimensión con el identificador igual a id
   */
  public read(id: string): Dimension | undefined {
    return database.data.dimensiones.find(dim => {
      const dimId = (dim as any)._id;
      return dimId === id;
    });
  }

  /**
   * Actualiza el estado de una dimensión en la base de datos
   * @param id - id de la dimensión que queremos actualizar
   * @param dimension - Nuevo estado de la dimensión
   */
  public async update(id: string, dimension: Dimension): Promise<void> {
    const index = database.data.dimensiones.findIndex(dim => {
      const dimId = (dim as any)._id;
      return dimId === id;
    });
    if (index === -1) throw new Error(`La dimensión con id ${id} no existe.`);
    database.data.dimensiones[index] = dimension;
    await database.write();
    console.log(`Dimensión ${id} actualizada correctamente.`);
  }
}