import { database } from "../db/db.js";
import { Character } from "./character.js";
import { CRUD } from "./crud/isCRUD.js";
import { Event } from "./event.js";
import { BasicUniversalObject } from "./basicUniversalObject.js";

/**
 * Clase MultiverseManager que implementa el patrón Singleton para gestionar el multiverso de Rick y Morty. 
 * Esta clase proporciona métodos para agregar personajes, dimensiones, inventos, localizaciones y especies a la base de datos, 
 * así como para registrar eventos interdimensionales y obtener versiones alternativas de personajes.
 */
export class MultiverseManager {
   /**
    * Implementación del patrón Singleton para asegurar que solo exista una instancia de MultiverseManager en toda la aplicación.
    */
   private static _multiverseInstance: MultiverseManager;
   
   /**
    * Historial de eventos interdimensionales que se han registrado en el multiverso. 
    */
   private _eventHistory: Event[] = [];

   /**
    * Gestor CRUD para manejar las operaciones de creación, lectura, actualización y eliminación en la base de datos.
    */
   private _crudManager: CRUD<BasicUniversalObject>
   
   /**
    * 
    */
   private constructor(eventHistory: Event[] = []) {
      this._eventHistory = eventHistory
   }

   /**
    * Metodo estático para obtener la instancia única de MultiverseManager. 
    * Si la instancia no existe, se crea una nueva. Si ya existe, se devuelve la instancia existente.
    * @returns la instancia única de MultiverseManager.
    */
   public static getInstance(): MultiverseManager {
      if (!MultiverseManager._multiverseInstance) {
        MultiverseManager._multiverseInstance = new MultiverseManager();
      }
      return MultiverseManager._multiverseInstance;
   }

   
   /**
    * Añade un nuevo objeto al multiverso utilizando el gestor CRUD. Antes de agregarlo, verifica si ya existe un objeto
    * con el mismo ID para evitar duplicados.
    * @param x - El objeto que se desea agregar al multiverso. Puede ser un personaje, dimensión, invento, localización, especie...
    */
   public async add(x: BasicUniversalObject): Promise<void> {
     this._crudManager.add(x);
   }
   
   /**
    * Elimina un objeto del multiverso utilizando el gestor CRUD. Antes de eliminarlo, verifica si existe un objeto
    * con el mismo ID para evitar errores.
    * @param id - El ID del objeto que se desea eliminar del multiverso.
    */
   public async delete(id: string): Promise<void> {
      this._crudManager.delete(id);
   }
   
   /**
    * Actualiza un objeto del multiverso utilizando el gestor CRUD. Antes de actualizarlo, verifica si existe un objeto
    * con el mismo ID para evitar errores.
    * @param id - El ID del objeto que se desea actualizar en el multiverso.
    * @param x - El nuevo estado del objeto que se desea actualizar en el multiverso. Puede ser un personaje, dimensión, invento, localización, especie...
    */
   public async update(id: string, x: BasicUniversalObject): Promise<void> {
      this._crudManager.update(id, x);
   }
   
   /**
    * Lee un objeto del multiverso utilizando el gestor CRUD. Antes de leerlo, verifica si existe un objeto
    * con el mismo ID para evitar errores.
    * @param x - El ID del objeto que se desea leer del multiverso.
    * @returns - El objeto con el ID especificado que se encuentra en el multiverso. Puede ser un personaje, dimensión, invento, localización, especie... 
    */
   public async read(x: string): Promise<BasicUniversalObject> {
      return this._crudManager.read(x);
   }
   

   /**
    * Registra un evento interdimensional en el historial de eventos del multiverso. 
    * Este método se puede utilizar para llevar un registro de los viajes interdimensionales, 
    * que ocurra en el multiverso.
    * @param event - El evento interdimensional que se desea registrar en el historial de eventos del multiverso.
    */
   public addEvent(event: Event): void {
      this._eventHistory.push(event);
   }

   /**
    * Devuelve el historial de eventos interdimensionales registrados en el multiverso.
    * @returns array de string representando historial de eventos interdimensionales registrados en el multiverso.
    */
   get eventHistory(): Event[] {
      return this._eventHistory;
   }

   public eventHistoryString(): string[] {
      return this._eventHistory.map(event => event.description);
   }

   set crudManager(crud: CRUD<BasicUniversalObject>) {
      this._crudManager = crud;
   }

   /**
    * Devuelve un array de personajes que tienen versiones alternativas en el multiverso.
    * @param characterName - El nombre del personaje para el cual se desean obtener las versiones alternativas.
    * @returns Lista de personajes que tienen versiones alternativas en el multiverso. 
    * Si no se encuentran versiones alternativas, devuelve un array vacío.
    */
   public getAlternativeVersions(characterName: string): Character[] {
      const alternativeVersions: Character[] = database.data.personajes.filter(pj => pj.name.toLowerCase().includes(characterName.toLowerCase()));
      return alternativeVersions;
   }

   /**
    * Detecta las dimensiones destruidas o personajes que cuya dimensión de origen ya no existe
    */
   public controlStateMultiverse(mode: "dimensions" | "characters") {
     
   }

}