/**
 * Clase Abstracta que representa un objeto básico universal.
 * DUDA: Nomenclatura del Consejo de Ricks para la id
 */
export abstract class BasicUniversalObject {
  protected readonly _id: string;
  protected readonly _name: string;
  protected _description: string;

  /**
   * Inicializa los atributos de BasicUniversalObject
   * 
   * @param id - Identificador único
   * @param name - Nombre del objeto
   * @param description - Descripción del objeto
   */
  constructor(id: string, name: string, description: string) {
    if (id.length === 0) throw Error('Id no puede ser vacío')
    if (name.length === 0) throw Error('Name no puede ser vacío')
    if (description.length === 0) throw Error('Description no puede ser vacío')

    this._id = id;
    this._name = name;
    this._description = description;
  }

  /**
   * Devuelve el id del objeto
   * @returns La id del objeto
   */
  get id(): string { return this._id }
  
  /**
   * Devuelve el nombre del objeto
   * @returns El nombre del objeto
   */
  get name(): string { return this._name }
  
  /**
   * Devuelve la descripción del objeto
   * @returns La descripción del objeto
   */
  get description(): string { return this._description }

  /**
   * Asigna una nueva descripción al objeto
   * @param desc - Nueva descripción del objeto
   * @throws Error si la descripción está vacía
   */
  set description(desc: string) {
    if (desc.length === 0) throw Error('Description no puede ser vacío')
    this.description = desc
  }
}