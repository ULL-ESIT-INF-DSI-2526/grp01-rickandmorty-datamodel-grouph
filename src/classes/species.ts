import { BasicUniversalObject } from "./basicUniversalObject.js";
import { Location } from "./location.js";
import { SpeciesType } from "../types/speciesType.js";
import { HasType } from "../interfaces/hasType.js";

/**
 * Clase que representa una especie en el universo
 */
export class Species extends BasicUniversalObject implements HasType<SpeciesType> {
  //preguntar si origen debe ser una union de tipos de planeta o dimension
    readonly #originLocation: Location;
    #speciesType: SpeciesType;
    #averageLifespan: number;

    /**
     * Crea una nueva instancia de la clase Specie.
     * @param id - El identificador único de la especie.
     * @param name - El nombre de la especie.
     * @param description - Una descripción de la especie.
     * @param originLocation - La ubicación de origen de la especie.
     * @param speciesType - El tipo de la especie.
     * @param averageLifespan - El tiempo de vida medio de la especie en años. Debe ser un número no negativo.
     */
    constructor(id: string, name: string, description: string, originLocation: Location, speciesType: SpeciesType, averageLifespan: number) {
        if (averageLifespan < 0) {throw new Error("El tiempo de vida medio no puede ser negativo");}
        if (originLocation === null) {throw new Error("La ubicación de origen no puede ser nula");}
        /**
         * Llamada al constructor de la clase padre BasicUniversalObject para inicializar las propiedades id, name y description. 
         */
        super(id, name, description);
        this.#originLocation = originLocation;
        this.#speciesType = speciesType;
        this.#averageLifespan = averageLifespan;
    }

    /**
     * Obtiene el tipo de la especie.
     * @returns - un objeto de tipo SpeciesType que representa el tipo de la especie.
     */
    get type(): SpeciesType {
        return this.#speciesType;
    }

    /**
     * Establece un nuevo tipo para la especie.
     * @param newType - un objeto de tipo SpeciesType que representa el nuevo tipo de la especie.
     */
    set type(newType: SpeciesType) {
        this.#speciesType = newType;
    }

    /**
     * Obtiene la ubicación de origen de la especie.
     * @returns - un objeto de tipo Location que representa la ubicación de origen de la especie.
     */
    get originLocation(): Location {
        return this.#originLocation;
    }

    /**
     * Obtiene el tipo de la especie.
     * @returns - un objeto de tipo SpeciesType que representa el tipo de la especie.
     */
    get specieType(): SpeciesType {
        return this.#speciesType;
    }

    /**
     * Obtiene el tiempo de vida medio de la especie en años.
     * @returns - un número que representa el tiempo de vida medio de la especie en años.
     */
    get averageLifespan(): number {
        return this.#averageLifespan;
    }

    set averageLifespan(newLifespan: number) {
        if (newLifespan < 0) {throw new Error("El tiempo de vida medio no puede ser negativo");}
        this.#averageLifespan = newLifespan;
    }
  
}
