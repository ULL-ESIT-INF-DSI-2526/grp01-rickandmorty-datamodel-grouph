import { database } from "../db/db.js";
import { Character } from "./character.js";
import { Location } from "./location.js";
import { Dimension } from "./dimension.js";
import { Species } from "./species.js";
import { Affiliation } from "../types/affiliation.js";
import { CharacterState } from "../types/characterState.js";
import { CRUD } from "./crud/isCRUD.js";
import { ItemCRUD } from "./crud/itemCRUD.js";
import { EventClass } from "./event.js";
import { DeployEvent } from "./deployEvent.js";
import { BasicUniversalObject } from "./basicUniversalObject.js";
import { ItemType } from "../types/itemType.js";
import { LocationType } from "../types/locationType.js";
import { Item } from "./item.js";
import { access } from "node:fs";
import { TravelEvent } from "./travelEvent.js";

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
    * Gestor CRUD para manejar las operaciones de creación, lectura, actualización y eliminación en la base de datos.
    */
   private _crudManager: CRUD<BasicUniversalObject>
   
   /**
    * 
    */
   private constructor() {
     
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
   public read(x: string): BasicUniversalObject | undefined{
      return this._crudManager.read(x);
   }
   

   public consultLocationByName(name: string): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => {
         const locName = (loc as any)._name || loc.name;
         return locName.toLowerCase().includes(name.toLowerCase());
      });
      if (locations.length === 0) throw new Error(`La localización con name ${name} no existe.`)
      return locations;
   }

   public consultLocationByType(type: LocationType): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => {
         const locType = (loc as any)._type || loc.type;
         return locType.toLowerCase().includes(type.toLowerCase());
      });
      if (locations.length === 0) throw new Error(`La localización con type ${type} no existe.`)
      return locations;
   }

   public consultLocationByDimension(dim: string): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => {
         const locDim = (loc as any)._dimension || loc.dimension;
         const locDimId = locDim.id || locDim._id;
         return locDimId === dim;
      });
      if (locations.length === 0) throw new Error(`La localización con dimensión ${dim} no existe.`)
      return locations;
   }

   private sortCharacters(characters: Character[], nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      if (nameOrIntelligence === "name") {
         if (sorttype === "asc") {
            return characters.sort((a, b) => a.name.localeCompare(b.name));
         } else {
            return characters.sort((a, b) => b.name.localeCompare(a.name));
         }
      } else {
         if (sorttype === "asc") {
            return characters.sort((a, b) => a.intelligence - b.intelligence);
         } else {
            return characters.sort((a, b) => b.intelligence - a.intelligence);
         }
      }
   }

   public consultCharacterByDimension(dim: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      const characters = database.data.personajes.filter(pj => {
         const pjDim = (pj as any)._dimension || pj.dimension;
         const pjDimId = pjDim.id || pjDim._id;
         return pjDimId === dim;
      });
      if (characters.length === 0) throw new Error(`El personaje con dimensión ${dim} no existe.`);
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);
   }

   public consultCharacterBySpecies(sp: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      const characters = database.data.personajes.filter(pj => {
         const pjSpecie = (pj as any)._specie || pj.specie;
         const pjSpecieName = pjSpecie.name || pjSpecie._name;
         return pjSpecieName === sp;
      });
      if (characters.length === 0) throw new Error(`El personaje con especie ${sp} no existe.`);
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);
   }

   public consultCharacterByAffiliation(affi: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      const characters = database.data.personajes.filter(pj => {
         const pjAffiliation = (pj as any)._affiliation || pj.affiliation;
         return pjAffiliation === affi;
      });
      if (characters.length === 0) throw new Error(`El personaje con afiliación ${affi} no existe.`)
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);   
   }

   public consultCharacterByState(state: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      const characters = database.data.personajes.filter(pj => pj.state == state);
      if (characters.length === 0) throw new Error(`El personaje con  ${state} no existe.`)
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);
   }

   public consultCharacterByName(name: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
     const characters = database.data.personajes.filter(pj => pj.name == name);
      if (characters.length === 0) throw new Error(`El personaje con name ${name} no existe.`)
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);
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
   public async addEvent(event: EventClass): Promise<void> {
      database.data.eventos.push(event);
      await database.write();
   }

   /**
    * Devuelve el historial de eventos interdimensionales registrados en el multiverso.
    * @returns array de string representando historial de eventos interdimensionales registrados en el multiverso.
    */
   get eventHistory(): EventClass[] {
      return database.data.eventos;
   }

   public eventHistoryString(): string[] {
      return this.eventHistory.map(event => event.description);
   }

   public set crudManager(crud: CRUD<BasicUniversalObject>) {
      this._crudManager = crud;
   }

   /**
    * Devuelve un array de personajes que tienen versiones alternativas en el multiverso.
    * @param characterName - El nombre del personaje para el cual se desean obtener las versiones alternativas.
    * @returns Lista de personajes que tienen versiones alternativas en el multiverso. 
    * Si no se encuentran versiones alternativas, devuelve un array vacío.
    */
   public getAlternativeVersions(characterName: string): Character[] {
      if (!characterName) return [];
        const alternativeVersions: Character[] = database.data.personajes.filter(pj => {
         const realName = (pj as any)._name;
         if (realName) return false; 
         return pj.name.toLowerCase().includes(characterName.toLowerCase());
      });      
      return alternativeVersions;
   }

   /**
    * Detecta las dimensiones destruidas o personajes que cuya dimensión de origen ya no existe
    */
   public controlStateMultiverse(): string[] {
      const alerts: string[] = [];
      const dimensionsData = database.data.dimensiones;
      const charactersData = database.data.personajes;
      const destroyedDimensions = dimensionsData.filter(dim => {
         const dimState = (dim as any)._state;
         return dimState === "Destruida";
      });
      for (const dim of destroyedDimensions) {
         const dimId = (dim as any)._id;
         alerts.push(`La dimensión ${dimId} ha sido destruida`);
      }

      for (const pj of charactersData) {
         const pjName = (pj as any)._name;
         const pjDim = (pj as any)._dimension;
         const pjDimId = pjDim.id || pjDim._id;
         const originDim = dimensionsData.find(dim => {
            const dimId = (dim as any)._id;
            return dimId === pjDimId;
         });
         if (!originDim || (originDim as any)._state === "Destruida" ) {
            alerts.push(`El personaje ${pjName} proviene de una dimensión que ya no existe`);
         } 
      }
      if (alerts.length === 0) {
         alerts.push("No se han detectado anomalías en el estado del multiverso");
      }
      return alerts;
   }
   
   public reportDimensions(): string {
      const dimensions = database.data.dimensiones;
      if (dimensions.length === 0) return "No hay dimensiones en este momento en el multiverso.";
      const activeDimensions = dimensions.filter(dim => {
         const dimState = (dim as any)._state;
         return dimState === "Activa";
      });
      if (activeDimensions.length === 0) {
         return "No hay dimensiones activas en este momento en el multiverso.";
      }
      let report: string = "Dimensiones activas en el multiverso:\n";
      let techSum: number = 0;
      for ( const dim of activeDimensions) {
         const dimId = (dim as any)._id;
         const dimTechLevel = (dim as any)._tecnologyLevel;
         report += `Dimension: ${dimId} - Nivel tecnológico: ${dimTechLevel}\n`;
         techSum += dimTechLevel;
      }
      const averageTechLevel = techSum / activeDimensions.length;
      report += `Nivel tecnológico medio de las dimensiones activas: ${averageTechLevel.toFixed(2)}`;
      return report;
   }

   /**
    * Genera un informe con los personajes que tienen más versiones alternativas.
    * Agrupa automáticamente a los personajes por su primer nombre (Ej: Rick, Morty).
    */
   public reportCharacter(): string {
      const characters = database.data.personajes;
      if (characters.length === 0) return "No hay personajes en este momento.";
      let report = " Personajes con más versiones alternativas:\n";
      const characterCountMap = new Map<string, number>();
      for (const pj of characters) {
         const nombreCompleto = (pj as any)._name;
         // Nos quedamos solo con la primera palabra
         const nombreBase = String(nombreCompleto).split(" ")[0].toUpperCase();

         // Sumamos 1 al contador de esa familia
         const cantidadActual = characterCountMap.get(nombreBase) || 0;
         characterCountMap.set(nombreBase, cantidadActual + 1);
      }
      // Convertimos en array para ordenar de mayor a menor
      const ranking = Array.from(characterCountMap.entries()).sort((a, b) => b[1] - a[1]);

      // Formateamos la salida (Mostramos el TOP 10)
      const limite = Math.min(10, ranking.length);
      for (let i = 0; i < limite; i++) {
         report += `${i + 1}º '${ranking[i][0]}' - ${ranking[i][1]} versiones registradas.\n`;
      }
      return report;
   }

   public reportItems(): string {  // evento.typeOfEvent && 'itemId' in evento.typeOfEvent
     const deployEvents = database.data.eventos.filter(evento => evento.typeOfEvent instanceof DeployEvent);
       if (deployEvents.length === 0) {
         return "No hay eventos de despliegue de inventos registrados en el multiverso.";
       }
       let deployedItems: { item: Item, locationId: string }[] = [];

       for (const event of deployEvents) {
         const deployDetails = event.typeOfEvent as DeployEvent;
         const foundItem = database.data.inventos.find(inv => inv.id === deployDetails.itemId);

         if (foundItem) {
            deployedItems.push({ item: foundItem, locationId: deployDetails.locationId });
         }
       }

       deployedItems.sort((a, b) => b.item.danger - a.item.danger);
       
       let report: string = "Inventos desplegados en el multiverso ordenados por nivel de peligro:\n";
         for (const deployed of deployedItems) {
           report += `Invento: ${deployed.item.name} - Nivel de peligro: ${deployed.item.danger}\n`;
         }
         return report;
   }

   public reportInterdimensionalTravels(characterName: string): string{
      const travelEvents = database.data.eventos.filter(evento => evento.description.includes(`viajó`) && 
      evento.description.toLowerCase().includes(characterName.toLowerCase()));
      if (travelEvents.length === 0) {
         return `No hay eventos de viajes interdimensionales registrados para este personaje`;
      }
      let report: string = `Viajes interdimensionales registrados para ${characterName}:\n`;
      for (let i = 0; i < travelEvents.length; i++) {
         report += `${i + 1}. ${travelEvents[i].description}\n`;
      }
      return report;
   }

}