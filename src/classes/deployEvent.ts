import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

/**
 * Clase que representa un evento de despliegue de un artefacto en una localización.
 * Implementa la interfaz TypeOfEvent.
 */
export class DeployEvent implements TypeOfEvent {

  /**
   * Constructor de la clase DeployEvent.
   * @param _itemId - ID del artefacto que se va a desplegar.
   * @param _locationId - ID de la localización donde se va a desplegar el artefacto.
   */
  constructor(public readonly _itemId: string, public readonly _locationId: string) {}

  /**
   * Getters para obtener el ID del artefacto
   */
  get itemId(): string {
    return this._itemId;
  }

  /**
   * Getters para obtener el ID de la localización
   */
  get locationId(): string{
    return this._locationId;
  }

  /**
   * Método que crea una descripción del evento de despliegue, incluyendo el nombre del artefacto y el nombre de la localización.
   * @returns Una cadena de texto que describe el evento de despliegue.
   * @throws Error si no se encuentra el artefacto o la localización en la base de datos. 
   */
  createDescription(): string {
    const item = database.data.inventos.find(item => {
      const itemId = (item as any)._id;
      return itemId === this.itemId;
    });
    const location = database.data.localizaciones.find(loc => {
      const locId = (loc as any)._id;
      return locId === this.locationId;
    });
    if (!item) {
      throw new Error(`Evento fallido. No se encontró el invento con ID ${this.itemId}.`);
    }
    if (!location) {
      throw new Error(`Evento fallido. No se encontró la localización con ID ${this.locationId}.`);
    }
    const event = `Despliegue del artefacto ${item.name} en la localización ${(location as any)._name}`;
    return event;
  }
}