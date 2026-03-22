import { BasicUniversalObject } from './basicUniversalObject.js'
import { DimensionState } from '../types/dimensionState.js';
import { HasState } from '../interfaces/hasState.js';

/**
 * Clase para crear una dimensión
 */
export class Dimension extends BasicUniversalObject implements HasState<DimensionState> {

  private _state: DimensionState;
  private _tecnologyLevel: number;

  /**
   * Crea una instancia de Dimension
   * 
   * @param id - Id de la dimensión
   * @param name - Nombre de la dimensión
   * @param desc - Descripción de la dimensión
   * @param state - Estado de la dimensión
   * @param tecnologyLevel - Nivel de tecnología de la dimensión
   */
  constructor(id: string, name: string, desc: string, state: DimensionState, tecnologyLevel: number) {
    const idRegex = /^[a-zA-Z]-?[a-zA-Z0-9]+$/;
    if (!idRegex.test(id)) throw new Error('El ID no sigue la nomenclatura del Consejo de Ricks');
    if (name.length === 0) throw new Error('Name no puede ser vacío');
    if (desc.length === 0) throw new Error('Description no puede ser vacío');
    super(id, name, desc);
    this._state = state;
    // Control de nivel tecnológico
    if (tecnologyLevel < 0 || tecnologyLevel > 10) throw new Error("Nivel tecnológico no válido")
    this._tecnologyLevel = tecnologyLevel;
  }

  /**
   * Getter de state
   * @returns El estado de la dimensión
   */
  get state() {
    return this._state 
  }

  /**
   * Getter de tecnologyLevel
   * @returns El nivel tecnológico de la dimensión
   */
  get tecnologyLevel() {
    return this._tecnologyLevel
  }

  /**
   * Setter de state
   * @param state - El nuevo estado de la dimensión
   */
  set state(state: DimensionState) {
    this._state = state;
  }

  /**
   * Setter de tecnologyLevel
   * @param level - El nuevo nivel tecnológico de la dimensión
   * @throws Error si el nivel tecnológico no es válido (menor o igual a 0 o mayor a 10)
   */
  set tecnologyLevel(level: number) {
    if (level < 0 || level > 10) throw new Error("Nivel tecnológico no válido")
    this._tecnologyLevel = level;
  }
}