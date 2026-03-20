import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

export class NeutralizationEvent implements TypeOfEvent {

  constructor(private itemId: string, private locationId: string) {}

  createDescription(): string {
    const item = database.data.personajes.find(item => item.id === this.itemId);
    const location = database.data.dimensiones.find(loc => loc.id === this.locationId);
    if (!item) {
      throw new Error(`Evento fallido. No se encontró el personaje con ID ${this.itemId}.`);
    }
    if (!location) {
      throw new Error(`Evento fallido. No se encontró la dimensión con ID ${this.locationId}.`);
    }
    const event = `Neutralización del artefacto ${item.name} en la localización ${location.name}`;
    return event;
  }
}