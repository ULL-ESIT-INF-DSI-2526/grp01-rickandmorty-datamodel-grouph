import { TypeOfEvent } from "../interfaces/typeOfEvent.js";
import { TravelEvent } from "./travelEvent.js";

/**
 * Clase que representa un evento genérico. Contiene una descripción y un tipo de evento.
 */
export class EventClass {
  private _description: string;
  private _typeOfEvent: TypeOfEvent;

  /**
   * Constructor de la clase EventClass. Recibe un tipo de evento.
   * @param typeOfEvent El tipo de evento que se va a asignar a la propiedad _typeOfEvent.
   */
  constructor(typeOfEvent: TypeOfEvent) {
    this._typeOfEvent = typeOfEvent;
  }

  /**
   * Método para establecer el tipo de evento.
   * @param typeOfEvent El tipo de evento que se va a asignar a la propiedad _typeOfEvent.
   */
  setTypeOfEvent(typeOfEvent: TypeOfEvent) {
    this._typeOfEvent = typeOfEvent;
  }

  /**
   * Método para obtener la descripción del evento.
   */
  get description(): string {
    return this._description;
  }

  /**
   * Método para establecer la descripción del evento.
   * @param desc La descripción que se va a asignar a la propiedad _description.
   */
  set description(desc: string) {
    this._description = desc;
  }

  /**
   * Método para obtener el tipo de evento.
   */
  get typeOfEvent(): TypeOfEvent {
    return this._typeOfEvent;
  }

  /**
   * Método para registrar el evento. Este método asigna a la propiedad description el resultado del método createDescription del tipo de evento.
   */
  register() {
    this.description = this._typeOfEvent.createDescription();
  }
}
