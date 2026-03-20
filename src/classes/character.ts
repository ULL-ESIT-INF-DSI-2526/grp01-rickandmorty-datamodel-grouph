import { HasState } from "../interfaces/hasState.js";
import { CharacterState } from "../types/characterState.js";
import { BasicUniversalObject } from "./basicUniversalObject.js";
import { Dimension } from "./dimension.js";
import { Species } from "./species.js";
import { Affiliation } from "../types/affiliation.js";


/**
 * Clase para representar un personaje
 */
export class Character extends BasicUniversalObject implements HasState<CharacterState> {
  readonly #Species: Species
  readonly #dimension: Dimension
  #state: CharacterState
  #affiliation: Affiliation
  #intelligence: number
  
  
  /**
   * Crea un nuevo personaje
   * @param id - ID del personaje
   * @param name - Nombre del personaje
   * @param desc - Descripción del personaje
   * @param Species - ESpecies del personaje
   * @param dimension - Dimensión del personaje
   * @param state - Estado del personaje
   * @param affiliation - Afiliación del personaje
   * @param intelligence - Inteligencia del personaje (1-10)
   * @throws Error si la inteligencia no está en el rango 1-10 o si la descripción está vacía
   */
  constructor(id: string, name: string, desc: string, Species: Species, dimension: Dimension, state: CharacterState, affiliation: Affiliation, intelligence: number) {
    super(id, name, desc)
    if (intelligence < 1 || intelligence > 10) throw Error('Intelligence debe estar en el rango 1-10')
    if (desc.length === 0) throw Error('Descripción no puede ser vacío')
    
    this.#Species = Species
    this.#dimension = dimension
    this.#state = state
    this.#affiliation = affiliation
    this.#intelligence = intelligence
  }

  /**
   * Devuelve la eSpecies
   * @returns La eSpecies del personaje
   */
  get specie(): Species { return this.#Species }
  
  /**
   * Devuelve la dimensión
   * @returns La dimensión del personaje
   */
  get dimension(): Dimension { return this.#dimension }
  
  /**
   * Devuelve el estado
   * @returns El estado del personaje
   */
  get state(): CharacterState { return this.#state }
  
  /**
   * Devuelve la afiliación
   * @returns La afiliación del personaje
   */
  get affiliation(): Affiliation { return this.#affiliation }
  
  /**
   * Devuelve el nivel de inteligencia
   * @returns El nivel de inteligencia del personaje
   */
  get intelligence(): number { return this.#intelligence }

  /**
   * Asigna un nuevo estado al personaje
   * @param x - Nuevo estado del personaje
   */
  set state(x: CharacterState) { this.#state = x }

  /**
   * Asigna una nueva afiliación al personaje
   * @param x - Nueva afiliación del personaje
   */
  set affiliation(x: Affiliation) { this.#affiliation = x }

  /**
   * Asigna un nuevo nivel de inteligencia al personaje
   * @param x - Nuevo nivel de inteligencia (1-10)
   * @throws Error si la inteligencia no está en el rango 1-10
   */
  set intelligence(x: number) { 
    if (x < 1 || x > 10) throw Error('Intelligence debe estar en el rango 1-10')
    this.#intelligence = x 
  }
}