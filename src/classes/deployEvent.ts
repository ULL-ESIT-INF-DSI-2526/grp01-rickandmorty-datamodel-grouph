import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

export class DeployEvent implements TypeOfEvent {

  constructor(private _itemId: string, private _locationId: string) {}

  get itemId(): string {
    return this._itemId;
  }

  get locationId(): string{
    return this._locationId;
  }

  createDescription(): string {
    const item = database.data.inventos.find(item => item.id === this.itemId);
    const location = database.data.localizaciones.find(loc => loc.id === this.locationId);
    if (!item) {
      throw new Error(`Evento fallido. No se encontró el personaje con ID ${this.itemId}.`);
    }
    if (!location) {
      throw new Error(`Evento fallido. No se encontró la localización con ID ${this.locationId}.`);
    }
    const event = `Despliegue del artefacto ${item.name} en la localización ${location.name}`;
    return event;
  }
}