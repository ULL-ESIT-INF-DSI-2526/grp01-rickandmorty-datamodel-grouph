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
   
   /**
    * Consulta las localizaciones del multiverso por su nombre, tipo o dimensión.
     * @param name - El nombre de la localización que se desea consultar. Puede ser una coincidencia parcial.
     * @param type - El tipo de la localización que se desea consultar. Puede ser una coincidencia parcial.
     * @param dim - La dimensión de la localización que se desea consultar. Debe coincidir exactamente con el ID de la dimensión.
     * @returns Lista de localizaciones que coinciden con los criterios de búsqueda especificados. Si no se encuentran localizaciones, devuelve un array vacío.
     * @throws Error si no se encuentra ninguna localización que coincida con los criterios de búsqueda especificados.
    */
   public consultLocationByName(name: string): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => {
         const locName = (loc as any)._name || loc.name;
         return locName.toLowerCase().includes(name.toLowerCase());
      });
      if (locations.length === 0) throw new Error(`La localización con name ${name} no existe.`)
      return locations;
   }

   /**
    * Consulta las localizaciones del multiverso por su tipo.
     * @param type - El tipo de la localización que se desea consultar. Puede ser una coincidencia parcial.
     * @returns Lista de localizaciones que coinciden con el tipo de búsqueda especificado. Si no se encuentran localizaciones, devuelve un array vacío.
     * @throws Error si no se encuentra ninguna localización que coincida con el tipo de búsqueda especificado.
     *
    */
   public consultLocationByType(type: LocationType): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => {
         const locType = (loc as any)._type || loc.type;
         return locType.toLowerCase().includes(type.toLowerCase());
      });
      if (locations.length === 0) throw new Error(`La localización con type ${type} no existe.`)
      return locations;
   }

   /**
    * Consulta las localizaciones del multiverso por su dimensión de origen.
    * @param dim - La dimensión de la localización que se desea consultar. Debe coincidir exactamente con el ID de la dimensión.
    * @returns Lista de localizaciones que coinciden con la dimensión de búsqueda especificada. Si no se encuentran localizaciones, devuelve un array vacío.
    * @throws Error si no se encuentra ninguna localización que coincida con la dimensión de búsqueda especificada.  
    */
   public consultLocationByDimension(dim: string): Location[] {
      const locations: Location[] = database.data.localizaciones.filter(loc => {
         const locDim = (loc as any)._dimension || loc.dimension;
         const locDimId = locDim.id || locDim._id;
         return locDimId === dim;
      });
      if (locations.length === 0) throw new Error(`La localización con dimensión ${dim} no existe.`)
      return locations;
   }

   /**
    * Método privado para ordenar una lista de personajes por su nombre o inteligencia, en orden ascendente o descendente.
     * @param characters - La lista de personajes que se desea ordenar.
     * @param nameOrIntelligence - El criterio por el cual se desea ordenar la lista de personajes. Puede ser "name" para ordenar por nombre o "intelligence" para ordenar por inteligencia.
     * @param sorttype - El tipo de ordenamiento que se desea aplicar a la lista de personajes. Puede ser "asc" para orden ascendente o "desc" para orden descendente.
     * @returns Lista de personajes ordenada según el criterio y tipo de ordenamiento especificados.
     * @throws Error si el criterio de ordenamiento especificado no es válido.
     * @throws Error si el tipo de ordenamiento especificado no es válido.
     * @throws Error si la lista de personajes está vacía.
    */
   private sortCharacters(characters: Character[], nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      return characters.sort((a, b) => {
         const nameA = String(a.name || (a as any)._name || "");
         const nameB = String(b.name || (b as any)._name || "");
         const intA = Number(a.intelligence || (a as any)._intelligence || 0);
         const intB = Number(b.intelligence || (b as any)._intelligence || 0);

         if (nameOrIntelligence === "name") {
            return sorttype === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
         } else {
            return sorttype === "asc" ? intA - intB : intB - intA;
         }
      });
   }

   /**
    * Consulta los personajes del multiverso por su dimensión de origen.
    * @param dim - La dimensión de origen del personaje que se desea consultar. Debe coincidir exactamente con el ID de la dimensión.
    * @param nameOrIntelligence - El criterio por el cual se desea ordenar la lista de personajes. Puede ser "name" para ordenar por nombre o "intelligence" para ordenar por inteligencia.
    * @param sorttype - El tipo de ordenamiento que se desea aplicar a la lista de personajes. Puede ser "asc" para orden ascendente o "desc" para orden descendente.
    * @returns Lista de personajes que coinciden con la dimensión de búsqueda especificada, ordenada según el criterio y tipo de ordenamiento especificados. Si no se encuentran personajes, devuelve un array vacío.
    * @throws Error si no se encuentra ningún personaje que coincida con la dimensión de búsqueda especificada.
    */
   public consultCharacterByDimension(dim: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      const characters = database.data.personajes.filter(pj => {
         const pjDim = (pj as any)._dimension || pj.dimension;
         if (!pjDim) return false;
         const pjDimId = pjDim.id || pjDim._id;
         return pjDimId === dim;
      });
      if (characters.length === 0) throw new Error(`El personaje con dimensión ${dim} no existe.`);
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);
   }

   /**
    * Consulta los personajes del multiverso por su especie.
    * @param sp - La especie del personaje que se desea consultar. Debe coincidir exactamente con el nombre de la especie.
    * @param nameOrIntelligence - El criterio por el cual se desea ordenar la lista de personajes. Puede ser "name" para ordenar por nombre o "intelligence" para ordenar por inteligencia.
    * @param sorttype - El tipo de ordenamiento que se desea aplicar a la lista de personajes. Puede ser "asc" para orden ascendente o "desc" para orden descendente.
    * @returns Lista de personajes que coinciden con la especie de búsqueda especificada, ordenada según el criterio y tipo de ordenamiento especificados. Si no se encuentran personajes, devuelve un array vacío.
    * @throws Error si no se encuentra ningún personaje que coincida con la especie de búsqueda especificada.
    */
public consultCharacterBySpecies(sp: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      const characters = database.data.personajes.filter(pj => {
         const pjSpecies = (pj as any)._Species;
         const pjSpeciesName = pjSpecies.name || pjSpecies._name;
         return String(pjSpeciesName).toLowerCase().includes(sp.toLowerCase());
      });
      if (characters.length === 0) throw new Error(`El personaje con especie '${sp}' no existe en la base de datos.`);
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);
   }

   /**
    * Consulta los personajes del multiverso por su afiliación.
    * @param affi - La afiliación del personaje que se desea consultar. Debe coincidir exactamente con el nombre de la afiliación.
    * @param nameOrIntelligence - El criterio por el cual se desea ordenar la lista de personajes. Puede ser "name" para ordenar por nombre o "intelligence" para ordenar por inteligencia.
    * @param sorttype - El tipo de ordenamiento que se desea aplicar a la lista de personajes. Puede ser "asc" para orden ascendente o "desc" para orden descendente.
    * @returns Lista de personajes que coinciden con la afiliación de búsqueda especificada, ordenada según el criterio y tipo de ordenamiento especificados. Si no se encuentran personajes, devuelve un array vacío.
    * @throws Error si no se encuentra ningún personaje que coincida con la afiliación de búsqueda especificada.
    */
   public consultCharacterByAffiliation(affi: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      const characters = database.data.personajes.filter(pj => {
         const pjAffiliation = (pj as any)._affiliation || pj.affiliation;
         return pjAffiliation.toLowerCase() === affi.toLowerCase();
      });
      if (characters.length === 0) throw new Error(`El personaje con afiliación ${affi} no existe.`)
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);   
   }

   /**
    * Consulta los personajes del multiverso por su estado (vivo, muerto, desconocido).
    * @param state - El estado del personaje que se desea consultar. Debe ser "vivo", "muerto" o "desconocido".
    * @param nameOrIntelligence - El criterio por el cual se desea ordenar la lista de personajes. Puede ser "name" para ordenar por nombre o "intelligence" para ordenar por inteligencia.
    * @param sorttype - El tipo de ordenamiento que se desea aplicar a la lista de personajes. Puede ser "asc" para orden ascendente o "desc" para orden descendente.
    * @returns Lista de personajes que coinciden con el estado de búsqueda especificado, ordenada según el criterio y tipo de ordenamiento especificados. Si no se encuentran personajes, devuelve un array vacío.
    * @throws Error si no se encuentra ningún personaje que coincida con el estado de búsqueda especificado.
    */
   public consultCharacterByState(state: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
      const characters = database.data.personajes.filter(pj => {
         const pjState = (pj as any)._state || pj.state;
         return pjState.toLowerCase() === state.toLowerCase();
      });
      if (characters.length === 0) throw new Error(`Los personajes con estado ${state} no existe.`)
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);
   }

   /**
    * Consulta los personajes del multiverso por su nombre. 
    * @param name - El nombre del personaje que se desea consultar. Puede ser una coincidencia parcial.
    * @param nameOrIntelligence - El criterio por el cual se desea ordenar la lista de personajes. Puede ser "name" para ordenar por nombre o "intelligence" para ordenar por inteligencia.
    * @param sorttype - El tipo de ordenamiento que se desea aplicar a la lista de personajes. Puede ser "asc" para orden ascendente o "desc" para orden descendente.
    * @returns Lista de personajes que coinciden con el nombre de búsqueda especificado, ordenada según el criterio y tipo de ordenamiento especificados. Si no se encuentran personajes, devuelve un array vacío.
    * @throws Error si no se encuentra ningún personaje que coincida con el nombre de búsqueda especificado.
    */
   public consultCharacterByName(name: string, nameOrIntelligence: "name" | "intelligence", sorttype: "asc" | "desc"): Character[] {
     const characters = database.data.personajes.filter(pj => {
         const pjName = (pj as any)._name || pj.name;
         return pjName.toLowerCase().includes(name.toLowerCase());
     });
      if (characters.length === 0) throw new Error(`El personaje con name ${name} no existe.`)
      return this.sortCharacters(characters, nameOrIntelligence, sorttype);
   }

   /**
    * Consulta los inventos del multiverso por su nombre.
    * @param name - El nombre del invento que se desea consultar. Puede ser una coincidencia parcial.
    * @returns Lista de inventos que coinciden con el nombre de búsqueda especificado. Si no se encuentran inventos, devuelve un array vacío.
    * @throws Error si no se encuentra ningún invento que coincida con el nombre de búsqueda especificado.
    */
   public consultItemByName(name: string): Item[]{
      const items: Item[] = database.data.inventos.filter(inv => {
         const invName = (inv as any)._name || inv.name;
         return invName.toLowerCase().includes(name.toLowerCase());
      });
      if (items.length === 0) throw new Error(`El invento con name ${name} no existe.`)
      return items;
   }

   /**
    * Consulta los inventos del multiverso por su tipo.
    * @param type - El tipo del invento que se desea consultar. Puede ser una coincidencia parcial.
    * @returns Lista de inventos que coinciden con el tipo de búsqueda especificado. Si no se encuentran inventos, devuelve un array vacío.
    * @throws Error si no se encuentra ningún invento que coincida con el tipo de búsqueda especificado.
    */
   public consultItemByType(type: ItemType): Item[]{
      const items: Item[] = database.data.inventos.filter(inv => {
         const invType = (inv as any)._type || inv.type;
         return invType.toLowerCase().includes(type.toLowerCase());
      });
      if (items.length === 0) throw new Error(`El invento con type ${type} no existe.`)
      return items;
   }

   /**
    * Consulta los inventos del multiverso por su inventor.
    * @param inventor - El nombre del inventor del invento que se desea consultar. Puede ser una coincidencia parcial.
    * @returns Lista de inventos que coinciden con el inventor de búsqueda especificado. Si no se encuentran inventos, devuelve un array vacío.
    * @throws Error si no se encuentra ningún invento que coincida con el inventor de búsqueda especificado.
    */
   public consultItemByInventor(inventor: string): Item[]{
      const items: Item[] = database.data.inventos.filter(inv => {
         const invInventor = (inv as any)._inventor;
         const invInventorName = invInventor.name || invInventor._name;
         return invInventorName.toLowerCase().includes(inventor.toLowerCase());
      });
      if (items.length === 0) throw new Error(`El invento con inventor ${inventor} no existe.`)
      return items;
   }

   /**
    * Consulta los inventos del multiverso por su nivel de peligro.
    * @param danger - El nivel de peligro del invento que se desea consultar. 
    * @returns Lista de inventos que coinciden con el nivel de peligro de búsqueda especificado. Si no se encuentran inventos, devuelve un array vacío.
    * @throws Error si no se encuentra ningún invento que coincida con el nivel de peligro de búsqueda especificado.
    */
   public consultItemByDanger(danger: number): Item[]{
      const items: Item[] = database.data.inventos.filter(inv => {
         const invDanger = (inv as any)._danger || inv.danger;
         return invDanger === danger;
      });
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

   /**
    * Devuelve el historial de eventos interdimensionales registrados en el multiverso en formato de string.
    * @returns array de string representando historial de eventos interdimensionales registrados en el multiverso.
    */
   public eventHistoryString(): string[] {
      return this.eventHistory.map(event => event.description);
   }

   /**
    * Getter para obtener el gestor CRUD utilizado por el MultiverseManager para manejar las operaciones de creación, lectura, actualización y eliminación en la base de datos.
    * @param crud - El gestor CRUD que se desea asignar al MultiverseManager.
    */
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
   
   /**
    * Genera un informe con las dimensiones activas en el multiverso, incluyendo su nivel tecnológico y el nivel tecnológico medio de todas las dimensiones activas.
     * @returns Un string representando el informe de las dimensiones activas en el multiverso. Si no hay dimensiones activas, devuelve un mensaje indicando que no hay dimensiones activas en este momento en el multiverso.
    */
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

   /**
    * Genera un informe con los inventos desplegados en el multiverso, incluyendo su nivel de peligro y localización.
    * @returns Un string representando el informe de los inventos desplegados en el multiverso. 
   */
   public reportItems(): string {  
      const eventsData = database.data.eventos;
      const deployedItems = new Map<string, string>();
      for (const event of eventsData) {
         const eventDesc = String((event as any)._description);
         const eventObj = (event as any)._typeOfEvent;
         
         const itemId = eventObj._itemId;
         const locationId = eventObj._locationId;
         if (itemId && locationId) {
            if (eventDesc.toLowerCase().includes("despliegue")){
               deployedItems.set(itemId, locationId);
            } else if (eventDesc.toLowerCase().includes("neutralizac")) {
               deployedItems.delete(itemId);
            }
         }
      }
      let deployedItemsArray: {item: Item, locationId: string}[] = [];
      for (const [itemId, locationId] of deployedItems.entries()){
         const foundItem = database.data.inventos.find(inv => {
            const invId = (inv as any)._id;
            return invId === itemId;
         });
         if (foundItem) {
            deployedItemsArray.push({item: foundItem, locationId});
         }
      }
      if (deployedItemsArray.length === 0) return "No hay inventos desplegados en este momento en el multiverso.";
      deployedItemsArray.sort((a, b) => {
         const itemNameA = Number((a.item as any)._danger);
         const itemNameB = Number((b.item as any)._danger);
         return itemNameB - itemNameA;
      });
      let report: string = "Inventos desplegados en el multiverso:\n";
      for (const deployed of deployedItemsArray) {
         const itemName = (deployed.item as any)._name;
         const itemDanger = (deployed.item as any)._danger;
         report += `Invento: ${itemName} - Nivel de peligro: ${itemDanger} - Localización: ${deployed.locationId}\n`;
      }
      return report; 
   }

   /**
    * Genera un informe con los eventos de viajes interdimensionales registrados en el multiverso para un personaje específico.
    * @param characterName - El nombre del personaje para el cual se desean obtener los eventos de viajes interdimensionales. Puede ser una coincidencia parcial.
    * @returns Un string representando el informe de los eventos de viajes interdimensionales registrados en el multiverso para el personaje especificado. 
   */
   public reportInterdimensionalTravels(characterName: string): string{
      const travelEvents = database.data.eventos.filter(evento => {
         const eventAnidado = (evento as any)._typeOfEvent;
         let eventDesc = (evento as any)._description;
         if (!eventDesc && eventAnidado){
            eventDesc = eventAnidado._description;
         }
         eventDesc = String(eventDesc || "");
         return eventDesc.toLowerCase().includes("viaj") && eventDesc.toLowerCase().includes(characterName.toLowerCase());
      });
      if (travelEvents.length === 0) {
         return `No hay eventos de viajes interdimensionales registrados para este personaje`;
      }
      let report: string = `Viajes interdimensionales registrados para ${characterName}:\n`;
      for (let i = 0; i < travelEvents.length; i++) {
         const event = travelEvents[i];
         const eventAnidado = (event as any)._typeOfEvent;
         let eventDesc = (event as any)._description;
         if (!eventDesc && eventAnidado){
            eventDesc = eventAnidado._description;
         }
         report += `${i + 1}º ${eventDesc}\n`;
      }
      return report;
   }

}