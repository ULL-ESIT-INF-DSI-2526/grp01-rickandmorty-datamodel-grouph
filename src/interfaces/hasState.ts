/**
 * Interfaz para las clases que contienen un estado. 
 * Posibles estados:
 * - CharacterState: (Ejemplo: Vivo, Muerto, Desconocido, Robot-sustituto).
 * - DimensionState: Indica si la dimensión sigue activa, ha sido destruida o está en cuarentena.
 * DUDA: sigue los principios SOLID?
 */
export interface HasState<T> {
  get state(): T
  set state(state: T)
}