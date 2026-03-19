/**
 * Interfaz para las clases que contienen un tipo. 
 * Posibles tipos:
 * - SpeciesType: (Ejemplo: Humanoide, Amorfo, Robótico, Parásito, Hivemind).
 * - PlanetType: (Ejemplo: Planeta, Estación espacial, Dimensión de bolsillo, Simulación virtual).
 */
export interface HasType<T> {
  get type(): T
  set type(state: T)
}