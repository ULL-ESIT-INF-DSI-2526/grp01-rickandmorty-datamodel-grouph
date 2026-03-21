import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { Character } from '../classes/character.js';
import { Dimension } from '../classes/dimension.js';
import { Location } from '../classes/location.js';
import { Item } from '../classes/item.js';
import { Species } from '../classes/species.js';
import { Event } from '../classes/event.js';
/**
 * Definimos la estructura de la base de datos 
 */
export type DBMultiverso = {
  personajes: Character[];
  dimensiones: Dimension[];
  especies: Species[];
  localizaciones: Location[];
  inventos: Item[];
  eventos: Event[];
}

/**
 * Creamos el adaptador para la base de datos utilizando el formato JSON y especificamos el archivo donde se almacenarán los datos.
 */
const adapter = new JSONFile<DBMultiverso>('db.json');

// Objeto database vacío que servirá como plantilla por defecto
const defaultData: DBMultiverso = {
  personajes: [],
  dimensiones: [],
  especies: [],
  localizaciones: [],
  inventos: [],
  eventos: []
}

// Creamos la instancia de la base de datos con los datos por defecto
export const database = new Low<DBMultiverso>(adapter, defaultData);

await database.read();

await database.write(); 
