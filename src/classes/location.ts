import { BasicUniversalObject } from './basicUniversalObject.js'
import { LocationType } from '../types/locationType.js'
import { Dimension } from './dimension.js'
import { HasType } from '../interfaces/hasType.js';

/**
 * Clase para crear una localización
 */
export class Location extends BasicUniversalObject implements HasType<LocationType>{
  #type: LocationType;
  #dimension: Dimension;
  #population: number;

  /**
   * Inicializa los atributos de BasicUniversalObject
   * 
   * @param id - Identificador único
   * @param name - Nombre del objeto
   * @param description - Descripción del objeto
   * @param type - Tipo único
   * @param dimension - Dimensión del objeto
   * @param population - Población del objeto
   */
  constructor(id: string, name: string, description: string, type: LocationType, dimension: Dimension, population: number) {
    super(id, name, description);
    this.#type = type;
    this.#dimension = dimension;
    // Control de population
    if (population < 0) throw new Error("Población no puede ser negativa")
    this.#population = population;
  }

  /**
   * Devuelve el type del objeto
   * @returns La type del objeto
   */
  get type(): LocationType { return this.#type}

  /**
   * Devuelve la dimension del objeto
   * @returns La dimension del objeto
   */
  get dimension(): Dimension { return this.#dimension}

  /**
   * Devuelve la población del objeto
   * @returns La population del objeto
   */
  get population(): number { return this.#population }

  /**
   * Asigna un nuevo tipo al objeto
   * @param type - Nuevo tipo del objeto
   */
  set type(type: LocationType) { this.#type = type }

  /**
   * Asigna una nueva dimensión al objeto
   * @param dimension - Nueva dimensión del objeto
   */
  set dimension(dimension: Dimension) { this.#dimension = dimension }


  /**
   * Asigna una nueva población al objeto
   * @param population - Nueva población del objeto
   * @throws Error si la población es negativa
   */
  set population(population: number) { 
    if (population < 0) throw new Error("Población no puede ser negativo")
    this.#population = population 
  }


}