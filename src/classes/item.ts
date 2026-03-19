import { ItemType } from "../types/itemType.js"
import { Character } from "./character.js"
import { BasicUniversalObject } from "./basicUniversalObject.js"

/**
 * Clase para representar un objeto del universo
 */
export class Item extends BasicUniversalObject {
  readonly #inventor: Character
  #type: ItemType
  #danger: number

  /**
   * Crea un nuevo objeto del universo
   * @param id - ID del objeto
   * @param name - Nombre del objeto
   * @param desc - Descripción del objeto
   * @param inventor - Personaje que inventó el objeto
   * @param type - Tipo del objeto
   * @param danger - Nivel de peligrosidad del objeto (0-10)
   */
  constructor(id: string, name: string, desc: string, inventor: Character, type: ItemType, danger: number) {
    super(id, name, desc)
    if (danger < 0 || danger > 10) throw new Error('Danger debe estar en el rango 0-10')
    this.#inventor = inventor
    this.#type = type
    this.#danger = danger
  }

  /**
   * Devuelve el personaje inventor del objeto
   * @returns El personaje inventor del objeto
   */
  get inventor() { return this.#inventor }

  /**
   * Devuelve type
   * @returns El tipo del objeto
   */
  get type() { return this.#type }

  /**
   * Asigna un tipo a type
   * @param type - Nuevo tipo del objeto
   */
  set type(type: ItemType) { this.#type = type }

  /**
   * Devuelve danger
   * @returns El nivel de peligrosidad del objeto
   */
  get danger() { return this.#danger }

  /**
   * Asigna un nivel de pelirosidad a danger
   * @param danger - Nuevo nivel de peligrosidad del objeto
   */
  set danger(danger: number) { this.#danger = danger }
}