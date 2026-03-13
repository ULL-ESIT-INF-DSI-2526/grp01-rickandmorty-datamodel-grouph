import { CharacterState } from "../types/characterState.js";
import { DimensionState } from "../types/dimensionState.js";

/**
 * Interfaz para las clases que contienen un estado. 
 * Posibles estados:
 * - CharacterState: (Ejemplo: Vivo, Muerto, Desconocido, Robot-sustituto).
 * - DimensionState: Indica si la dimensión sigue activa, ha sido destruida o está en cuarentena.
 * DUDA: sigue los principios SOLID?
 */
export interface HasState<T extends (CharacterState | DimensionState)> {
  getState(): T
  setState(): T
}