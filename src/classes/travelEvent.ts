import { TypeOfEvent } from '../interfaces/typeOfEvent.js';
import { database } from "../db/db.js";

export class TravelEvent implements TypeOfEvent {

  constructor(private characterid: string, private destinationDimensionId: string, private date: Date, private reason: string) {}

  createDescription(): string {
    const character = database.data.personajes.find(pj => {
      const pjId = (pj as any)._id;
      return pjId === this.characterid;
    });
    const dimension = database.data.dimensiones.find(dim => {
      const dimId = (dim as any)._id;
      return dimId === this.destinationDimensionId;
    });

    if (!character) {
      throw new Error(`Evento fallido. No se encontró el personaje con ID ${this.characterid}.`);
    }
    if (!dimension) {
      throw new Error(`Evento fallido. No se encontró la dimensión con ID ${this.destinationDimensionId}.`);
    }

    if (this.date > new Date()) {
      throw new Error("Evento fallido. Fecha no válida");
    }
    const event = `${(character as any)._name} viajó a la dimensión ${(dimension as any)._id}. Motivo del viaje: ${this.reason}. Fecha: ${this.date.toLocaleString()}.`;
    return event;
  }
}