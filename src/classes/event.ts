import { TypeOfEvent } from "../interfaces/typeOfEvent.js";
import { TravelEvent } from "./travelEvent.js";

export class Event {
  private _description: string;
  private _typeOfEvent: TypeOfEvent;

  constructor(typeOfEvent: TypeOfEvent) {
    this._typeOfEvent = typeOfEvent;
  }

  setTypeOfEvent(typeOfEvent: TypeOfEvent) {
    this._typeOfEvent = typeOfEvent;
  }

  get description(): string {
    return this._description;
  }

  set description(desc: string) {
    this._description = desc;
  }

  get typeOfEvent(): TypeOfEvent {
    return this._typeOfEvent;
  }

  register() {
    this.description = this._typeOfEvent.createDescription();
  }
}

const fecha = new Date("2026-2-2")
const viaje = new TravelEvent("idcharacter1", "C-120", fecha,"Se aburre");

const evento = new Event(viaje);
evento.register();

console.log(evento.description);