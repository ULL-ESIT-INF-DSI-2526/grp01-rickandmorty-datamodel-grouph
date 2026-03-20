import { database } from "../db/db.js";
import { Character } from "./character.js";
import { Location } from "./location.js";
import { Dimension } from "./dimension.js";
import { Species } from "./species.js";
import { Affiliation } from "../types/affiliation.js";
import { CharacterState } from "../types/characterState.js";
import { CRUD } from "./crud/isCRUD.js";
import { ItemCRUD } from "./crud/itemCRUD.js";
import { Event } from "./event.js";
import { DeployEvent } from "./deployEvent.js";
import { BasicUniversalObject } from "./basicUniversalObject.js";
import { ItemType } from "../types/itemType.js";
import { LocationType } from "../types/locationType.js";
import { Item } from "./item.js";

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
   

   public consultLocationByName(name: string): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => loc.name.toLowerCase().includes(name.toLowerCase()));
      if (locations.length === 0) throw new Error(`La localización con name ${name} no existe.`)
      return locations;
   }

   public consultLocationByType(type: LocationType): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => loc.type.toLowerCase().includes(type.toLowerCase()));
      if (locations.length === 0) throw new Error(`La localización con type ${type} no existe.`)
      return locations;
   }

   public consultLocationByDimension(dim: string): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => loc.dimension.id == dim);
      if (locations.length === 0) throw new Error(`La localización con dimensión ${dim} no existe.`)
      return locations;
   }

   public consultCharacterByDimension(dim: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      let characters: Character[] = database.data.personajes.filter(pj => pj.dimension.id == dim);
      if (characters.length === 0) throw new Error(`El personaje con dimensión ${dim} no existe.`)

      if (nameOrIntelligence == "name" && sorttype == "asc") {
        characters = characters.sort((a, b) => a.name.localeCompare(b.name))   
      } else if (nameOrIntelligence == "name" && sorttype == "desc") {
         characters = characters.sort((a, b) => b.name.localeCompare(a.name))  
      } else if (nameOrIntelligence == "intelligence" && sorttype == "asc"){
         characters = characters.sort((a, b) => a.intelligence - b.intelligence)
      } else if (nameOrIntelligence == "intelligence" && sorttype == "desc"){
         characters = characters.sort((a, b) => b.intelligence - a.intelligence)
      }
      return characters;
   }

   public consultCharacterBySpecies(sp: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      let characters: Character[] = database.data.personajes.filter(pj => pj.specie.name == sp);
      if (characters.length === 0) throw new Error(`El personaje con especie ${sp} no existe.`)

      if (nameOrIntelligence == "name" && sorttype == "asc") {
        characters = characters.sort((a, b) => a.name.localeCompare(b.name))   
      } else if (nameOrIntelligence == "name" && sorttype == "desc") {
         characters = characters.sort((a, b) => b.name.localeCompare(a.name))  
      } else if (nameOrIntelligence == "intelligence" && sorttype == "asc"){
         characters = characters.sort((a, b) => a.intelligence - b.intelligence)
      } else if (nameOrIntelligence == "intelligence" && sorttype == "desc"){
         characters = characters.sort((a, b) => b.intelligence - a.intelligence)
      }
      return characters;
   }

   public consultCharacterByLocation(affi: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      let characters: Character[] = database.data.personajes.filter(pj => pj.affiliation == affi);
      if (characters.length === 0) throw new Error(`El personaje con afiliación ${affi} no existe.`)

      if (nameOrIntelligence == "name" && sorttype == "asc") {
        characters = characters.sort((a, b) => a.name.localeCompare(b.name))   
      } else if (nameOrIntelligence == "name" && sorttype == "desc") {
         characters = characters.sort((a, b) => b.name.localeCompare(a.name))  
      } else if (nameOrIntelligence == "intelligence" && sorttype == "asc"){
         characters = characters.sort((a, b) => a.intelligence - b.intelligence)
      } else if (nameOrIntelligence == "intelligence" && sorttype == "desc"){
         characters = characters.sort((a, b) => b.intelligence - a.intelligence)
      }
      return characters;
   }

   public consultCharacterByState(state: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      let characters: Character[] = database.data.personajes.filter(pj => pj.state == state);
      if (characters.length === 0) throw new Error(`El personaje con  ${state} no existe.`)

      if (nameOrIntelligence == "name" && sorttype == "asc") {
        characters = characters.sort((a, b) => a.name.localeCompare(b.name))   
      } else if (nameOrIntelligence == "name" && sorttype == "desc") {
         characters = characters.sort((a, b) => b.name.localeCompare(a.name))  
      } else if (nameOrIntelligence == "intelligence" && sorttype == "asc"){
         characters = characters.sort((a, b) => a.intelligence - b.intelligence)
      } else if (nameOrIntelligence == "intelligence" && sorttype == "desc"){
         characters = characters.sort((a, b) => b.intelligence - a.intelligence)
      }
      return characters;
   }

   public consultCharacterByName(name: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
     let characters: Character[] = database.data.personajes.filter(pj => pj.name == name);
      if (characters.length === 0) throw new Error(`El personaje con name ${name} no existe.`)
      
      if (nameOrIntelligence == "name" && sorttype == "asc") {
        characters = characters.sort((a, b) => a.name.localeCompare(b.name))   
      } else if (nameOrIntelligence == "name" && sorttype == "desc") {
         characters = characters.sort((a, b) => b.name.localeCompare(a.name))  
      } else if (nameOrIntelligence == "intelligence" && sorttype == "asc"){
         characters = characters.sort((a, b) => a.intelligence - b.intelligence)
      } else if (nameOrIntelligence == "intelligence" && sorttype == "desc"){
         characters = characters.sort((a, b) => b.intelligence - a.intelligence)
      }
      return characters;
   }

      public consultItemByName(name: string): Item[]{
         const items: Item[] = database.data.inventos.filter(inv => inv.name.toLowerCase().includes(name.toLowerCase()));
         if (items.length === 0) throw new Error(`El invento con name ${name} no existe.`)
         return items;
      }

      public consultItemByType(type: ItemType): Item[]{
         const items: Item[] = database.data.inventos.filter(inv => inv.type.toLowerCase().includes(type.toLowerCase()));
         if (items.length === 0) throw new Error(`El invento con type ${type} no existe.`)
         return items;
      }

      public consultItemByInventor(inventor: string): Item[]{
         const items: Item[] = database.data.inventos.filter(inv => inv.inventor.name.toLowerCase().includes(inventor.toLowerCase()));
         if (items.length === 0) throw new Error(`El invento con inventor ${inventor} no existe.`)
         return items;
      }

      public consultItemByDanger(danger: number): Item[]{
         const items: Item[] = database.data.inventos.filter(inv => inv.danger == danger);
         if (items.length === 0) throw new Error(`El invento con nivel de peligro ${danger} no existe.`)
         return items;
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
   public controlStateMultiverse(mode: "dimensions" | "characters"): BasicUniversalObject[] | undefined {
     if (mode == "dimensions") {
        const dimension: Dimension[] = database.data.dimensiones.filter(dim => dim.state == "Destruida");
        return dimension;
     } else if (mode == "characters") {
        const character: Character[] = database.data.personajes.filter(pj => pj.dimension.state == "Destruida");
        return character;
     } else {  // En caso de que no existan dimensiones destruidas
         const dim: Dimension[] = []
        return dim;
     }
   }

   //reporte de dimensiones activas con su nivel tecnológico, debe devolver un array de pares (dimensionid, nivel tecnológico)
   public reportDimensions(): {dimensionId: string, techLevel: number}[] {
      const dimensions = database.data.dimensiones.filter(dim => dim.state == "Activa");
      return dimensions.map(dim => ({dimensionId: dim.id, techLevel: dim.tecnologyLevel}));
   }

   public reportCharacters(): Character[] {
     const characters = database.data.personajes.filter(pj => pj);

     let maxVersions: number = this.getAlternativeVersions(characters[0].name).length

     // Buscamos el número máximo de versiones
     for (let i = 0; i < characters.length; i++) {
       let newMax = this.getAlternativeVersions(characters[i].name).length
       if (maxVersions < newMax) {
         maxVersions = newMax
       }
     }

     // Guardamos los personajes con el número máximo de versiones
     let result: Character[] = [];
     for (let i = 0; i < characters.length; i++) {
       if (maxVersions == this.getAlternativeVersions(characters[i].name).length) {
         result.push(characters[i])
       }
     }

     return result;
   }

   public reportItems(): Item[] {
     // Primero filtramos los eventos tipo Deploy
     const events: Event[] = this._eventHistory.filter(event => typeof(event.typeOfEvent) == typeof(DeployEvent))
     
     const dpev: DeployEvent = new DeployEvent("iditem", "idlocation");
      events[0].setTypeOfEvent(dpev);

     // Sacamos una lista de los items de esos eventos
     let items: Item[] = [];
     for (let i = 0; i < events.length; i++) {
       let event = events[i].typeOfEvent
       if () {
       let item = database.data.inventos.find(item => item.id == events[i].typeOfEvent.itemId)
       items.push()
       }
     }
     
   }

   public reportInterdimensionalTravels(characterName: string): Event[] {
     const travelEvents: Event[] = this._eventHistory.filter(event => event.description.includes(characterName) && event.description.includes("viaje interdimensional"));
       return travelEvents;
    }
}