import { database } from "../db/db.js";
import { Character } from "./character.js";
import { Dimension } from "./dimension.js";
import { Item } from "./item.js";
import { Location } from "./location.js";
import { Species } from "./species.js";

export class GestorMultiverso {
   /**
    * Implementación del patrón Singleton para asegurar que solo exista una instancia de GestorMultiverso en toda la aplicación.
    */
   private static multiverseInstance: GestorMultiverso;
   
   /**
    * Historial de eventos interdimensionales que se han registrado en el multiverso. 
    */
   private eventHistory: string[] = [];

   private constructor() {};

   public static getInstance(): GestorMultiverso {
      if (!GestorMultiverso.multiverseInstance) {
        GestorMultiverso.multiverseInstance = new GestorMultiverso();
      }
      return GestorMultiverso.multiverseInstance;
   }

   public addCharacter(character: Character): void {
     const existingCharacter = database.data.personajes.find(pj => pj.id === character.id);
       if (existingCharacter) {
          console.log(`El personaje con ID ${character.id} ya existe en la base de datos.`);
          return;
       }
       database.data.personajes.push(character);
       database.write();
       
   }

   public addDimension(dimension: Dimension): void {
      const existingDimension = database.data.dimensiones.find(dim => dim.id === dimension.id);
       if (existingDimension) {
          console.log(`La dimensión con ID ${dimension.id} ya existe en la base de datos.`);
          return;
       }
       database.data.dimensiones.push(dimension);
       database.write();
   }

   public addItem(item: Item): void {
      const existingItem = database.data.inventos.find(inv => inv.id === item.id);
       if (existingItem) {
          console.log(`El ítem con ID ${item.id} ya existe en la base de datos.`);
          return;
       }
       database.data.inventos.push(item);
       database.write();
   }

   public addLocation(location: Location): void {
      const existingLocation = database.data.localizaciones.find(loc => loc.id === location.id);
       if (existingLocation) {
          console.log(`El lugar con ID ${location.id} ya existe en la base de datos.`);
          return;
       }
       database.data.localizaciones.push(location);
       database.write();
   }

   public addSpecies(species: Species): void {
      const existingSpecies = database.data.especies.find(esp => esp.id === species.id);
       if (existingSpecies) {
          console.log(`La especie con ID ${species.id} ya existe en la base de datos.`);
          return;
       }
       database.data.especies.push(species);
       database.write();
   }

   public logEvent(event: string): void {
      this.eventHistory.push(event);
   }

   public getEventHistory(): string[] {
      return this.eventHistory;
   }

   public getAlternativeVersions(characterName: string): Character[] {
      const alternativeVersions: Character[] = database.data.personajes.filter(pj => pj.name.toLowerCase().includes(characterName.toLowerCase()));
      return alternativeVersions;
   }

   public travelRegister(characterid: string, destinationDimensionId: string, reason: string): void {
      const character = database.data.personajes.find(pj => pj.id === characterid);
      const dimension = database.data.dimensiones.find(dim => dim.id === destinationDimensionId);
      if (!character) {
         console.log(`No se encontró el personaje con ID ${characterid}.`);
         return;
      }
      if (!dimension) {
         console.log(`No se encontró la dimensión con ID ${destinationDimensionId}.`);
         return;
      }
   }

}