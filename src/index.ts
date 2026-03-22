import prompts from 'prompts';
import promptSync from 'prompt-sync';
import { MultiverseManager } from './classes/gestorMultiverso.js';
import { seedDatabase } from './db/seeder.js'; // Ajusta la ruta si es necesario
import { TravelEvent } from './classes/travelEvent.js';
import { CreateEvent } from './classes/createEvent.js';
import { DestructionEvent } from './classes/destructionEvent.js';
import { DeployEvent } from './classes/deployEvent.js';
import { NeutralizationEvent } from './classes/neutralizationEvent.js';
import { DimensionState } from './types/dimensionState.js';
import { Dimension } from './classes/dimension.js';
import { DimensionCRUD } from './classes/crud/dimensionCrud.js';
import { Character } from './classes/character.js';
import { CharacterCRUD } from './classes/crud/characterCrud.js';
import { Species } from './classes/species.js';
import { SpeciesCRUD } from './classes/crud/speciesCRUD.js';
import { Item } from './classes/item.js';
import { ItemCRUD } from './classes/crud/itemCRUD.js';
import { Location } from './classes/location.js';
import { LocationCRUD } from './classes/crud/locationCRUD.js';
import { spec } from 'node:test/reporters';
import { EventClass } from './classes/event.js';


// ==========================================
// 1. SUBMENÚ: INFORMES GLOBALES (Manejo de Strings)
// ==========================================
// NOTA: Como tu Gestor devuelve 'strings' ya formateados y bonitos,
// la consola solo tiene la responsabilidad de hacer un console.log(). ¡Así de fácil!
async function menuInformes(gestor: MultiverseManager) {
    const prompt = promptSync();
    const respuesta = await prompts({
        type: 'select',
        name: 'tipo',
        message: '¿Qué informe deseas generar?',
        choices: [
            { title: '1. Dimensiones Activas y Nivel Tecnológico', value: 'dim' },
            { title: '2. Personajes con más versiones alternativas', value: 'char' },
            { title: '3. Inventos más peligrosos desplegados', value: 'items' },
            { title: '4. Historial de viajes', value: 'journey' },
            { title: 'Volver al menú principal', value: 'volver' }
        ]
    });

    console.log("\n--------------------------------------------------");
    
    if (respuesta.tipo === 'dim') {
        console.log(gestor.reportDimensions());
    } else if (respuesta.tipo === 'char') {
        console.log(gestor.reportCharacter());
    } else if (respuesta.tipo === 'items') {
        console.log(gestor.reportItems());
    } else if (respuesta.tipo === 'journey') {
        let characterName: string | null = prompt("Introduce el nombre del personaje para ver su historial de viajes: ");
        console.log(gestor.reportInterdimensionalTravels(characterName));
    } else {
        console.log("Volviendo al menú principal...");
    }
    
    console.log("--------------------------------------------------\n");
}


//==========================================
//2. SUBMENU: GESTION BASICA (CRUD)
//==========================================

async function menuCRUD(gestor: MultiverseManager) {
  const respuesta = await prompts({
    type: 'select',
    name: 'tipo',
    message: '¿Qué entidad deseas gestionar?',
    choices: [
        { title: 'Dimensiones', value: 'dim' },
        { title: 'Personajes', value: 'per' },
        { title: 'Especies', value: 'esp' },
        { title: 'Inventos', value: 'inv' },
        { title: 'Localizaciones', value: 'loc' },
        { title: 'Eventos', value: 'ev' },
        { title: 'Volver', value: 'volver' }
    ]
  });

  switch (respuesta.tipo) {
    case 'dim':
        await menuCRUDDimension(gestor);
        break;
    case 'per':
        await menuCRUDCharacter(gestor);
        break;
    case 'esp':
        await menuCRUDSpecies(gestor);
        break;
    case 'inv':
        await menuCRUDItem(gestor);
        break;
    case 'loc':
        await menuCRUDLocation(gestor);
        break;
    case 'ev':
        await menuCRUDEvent(gestor);
        break;
    default: 
        console.log("Volviendo...");
        break;
  }
}

async function menuCRUDDimension(gestor: MultiverseManager) {
    const prompt = promptSync();
    const respuesta = await prompts({
    type: 'select',
    name: 'tipo',
    message: '¿Qué operación deseas hacer?',
    choices: [
        { title: 'Añadir', value: 'add' },
        { title: 'Borrar', value: 'del' },
        { title: 'Modificar', value: 'mod' },
        { title: 'Volver', value: 'volver' }
    ]
  });

  switch (respuesta.tipo) {
    case 'add':
        let dimensionid: string | null = prompt("Introduce el ID de la dimensión: ");
        let name: string | null = prompt("Introduzca el nombre: ");
        let status: string | null = prompt("Introduzca el estado: ");
        let tecnologyLevel: number | null = Number(prompt("Introduzca el nivel tecnológico: "));
        let description: string | null = prompt("Introduzca la descripción: ");
        let paradox: string | null = prompt("¿Por qué se creó la dimensión?: ");

        if (dimensionid && name && status && tecnologyLevel && description && paradox) {
            if (status != 'Activa' && status != 'Destruida' && status != 'Cuarentena') {
              console.log("Estado de dimensión no válido");
            } else {
              const dimension = new Dimension(dimensionid, name, description, status, tecnologyLevel);
              gestor.crudManager = new DimensionCRUD();
              gestor.add(dimension);
              const createEvent = new CreateEvent(dimensionid, paradox);
              const event = new EventClass(createEvent);
              event.register();
              gestor.addEvent(event);
            }
            
        } else {
          console.log("Error con alguno de los valores");
        }
        break;
    case 'del':
        let deleteid: string | null = prompt("Introduce el ID de la dimensión");
        let reason: string | null = prompt("¿Por qué se destruye la dimensión?: ");
        if (deleteid && reason) {
          gestor.crudManager = new DimensionCRUD();
          gestor.delete(deleteid);
          const destructionEvent = new DestructionEvent(deleteid, reason);
          const event = new EventClass(destructionEvent);
          event.register();
          gestor.addEvent(event); 
        }
        break;
    case 'mod':
        let modid: string | null = prompt("Introduce el ID de la dimensión a modificar: ");
        let newName: string | null = prompt("Introduzca el nombre: ");
        let newStatus: string | null = prompt("Introduzca el estado: ");
        let newTecnologyLevel: number | null = Number(prompt("Introduzca el nivel tecnológico: "));
        let newDescription: string | null = prompt("Introduzca la descripción: ");

        if (modid && newName&& newStatus && newTecnologyLevel && newDescription) {
            if (newStatus != 'Activa' && newStatus != 'Destruida' && newStatus != 'Cuarentena') {
              console.log("Estado de dimensión no válido");
            } else {
              const dimension = new Dimension(modid, newName, newDescription, newStatus, newTecnologyLevel);
              gestor.crudManager = new DimensionCRUD();
              gestor.update(modid, dimension);
            }
            
        } else {
          console.log("Error con alguno de los valores");
        }
        break;
    default: 
        console.log("Volviendo...");
        break;
  }
}

async function menuCRUDCharacter(gestor: MultiverseManager) {
    const prompt = promptSync();
    const respuesta = await prompts({
    type: 'select',
    name: 'tipo',
    message: '¿Qué operación deseas hacer?',
    choices: [
        { title: 'Añadir', value: 'add' },
        { title: 'Borrar', value: 'del' },
        { title: 'Modificar', value: 'mod' },
        { title: 'Volver', value: 'volver' }
    ]
  });

  switch (respuesta.tipo) {
    case 'add':
        let characterid: string | null = prompt("Introduce el ID del personaje: ");
        let name: string | null = prompt("Introduzca el nombre: ");
        let dimensionid: string | null = prompt("Introduzca el id de la dimensión: ");
        let status: string | null = prompt("Introduzca el estado: ");
        let affiliation: string | null = prompt("Introduzca la afiliación: ");
        let intelligenceLevel: number | null = Number(prompt("Introduzca el nivel de inteligencia: "));
        let description: string | null = prompt("Introduzca la descripción: ");
        let species: string | null = prompt("Introduzca la especie: ");

        if (characterid && name && status && affiliation && dimensionid && intelligenceLevel && description && species) {
            if (status != 'Vivo' && status != 'Muerto' && status != 'Desconocido' && status != 'Robot-sustituto') {
              console.log("Estado de personaje no válido");
            } else if (affiliation != 'Federación Galáctica' && affiliation != 'Consejo de Ricks' && affiliation != 'Independiente' && affiliation != 'Familia Smith') {
              console.log("Afiliación de personaje no válida");
            } else {
              const dimensionCRUD = new DimensionCRUD();
              const dimension = dimensionCRUD.read(dimensionid);
              const speciesCRUD = new SpeciesCRUD();
              const speciesObj = speciesCRUD.read(species);
              if (!dimension) throw new Error(`La dimension es undefined.`);
              if (!speciesObj) throw new Error(`La especie es undefined`);
              const character = new Character(characterid, name, description, speciesObj, dimension, status, affiliation, intelligenceLevel);
              gestor.crudManager = new CharacterCRUD();
              gestor.add(character);
            }
            
        } else {
          console.log("Error con alguno de los valores");
        }
        break;
    case 'del':
        let deleteid: string | null = prompt("Introduce el ID del personaje: ");

        if (deleteid) {
          gestor.crudManager = new CharacterCRUD();
          gestor.delete(deleteid);
        }
        break;
    case 'mod':
        let modid: string | null = prompt("Introduce el ID del personaje a modificar: ");
        let newName: string | null = prompt("Introduzca el nombre: ");
        let newDimensionid: string | null = prompt("Introduzca el id de la dimensión de origen: ");
        let newStatus: string | null = prompt("Introduzca el estado: ");
        let newAffiliation: string | null = prompt("Introduzca la afiliación: ");
        let newIntelligenceLevel: number | null = Number(prompt("Introduzca el nivel de inteligencia: "));
        let newDescription: string | null = prompt("Introduzca la descripción: ");
        let newSpecies: string | null = prompt("Introduzca la especie: ");

        if (modid && newName && newStatus && newAffiliation && newDimensionid && newIntelligenceLevel && newDescription && newSpecies) {
            if (newStatus != 'Vivo' && newStatus != 'Muerto' && newStatus != 'Desconocido' && newStatus != 'Robot-sustituto') {
              console.log("Estado de personaje no válido");
            } else if (newAffiliation != 'Federación Galáctica' && newAffiliation != 'Consejo de Ricks' && newAffiliation != 'Independiente' && newAffiliation != 'Familia Smith') {
              console.log("Afiliación de personaje no válida");
            } else {
              const dimCrud = new DimensionCRUD();
              const dimension = dimCrud.read(newDimensionid);
              const speciesCrud = new SpeciesCRUD();
              const speciesObj = speciesCrud.read(newSpecies);
              if (!dimension) throw new Error(`La dimension es undefined.`);
              if (!speciesObj) throw new Error(`La especie es undefined`);
              const character = new Character(modid, newName, newDescription, speciesObj, dimension, newStatus, newAffiliation, newIntelligenceLevel);
              gestor.crudManager = new CharacterCRUD();
              gestor.update(modid, character);
            }
        }
        break;
    default: 
        console.log("Volviendo...");
        break;
  }
}

async function menuCRUDItem(gestor: MultiverseManager) {
    const prompt = promptSync();
    const respuesta = await prompts({
    type: 'select',
    name: 'tipo',
    message: '¿Qué operación deseas hacer?',
    choices: [
        { title: 'Añadir', value: 'add' },
        { title: 'Borrar', value: 'del' },
        { title: 'Modificar', value: 'mod' },
        { title: 'Volver', value: 'volver' }
    ]
  });

  switch (respuesta.tipo) {
    case 'add':
        let itemid: string | null = prompt("Introduce el ID del invento: ");
        let name: string | null = prompt("Introduzca el nombre: ");
        let inventor: string | null = prompt("Introduzca el ID del inventor: ");
        let type: string | null = prompt("Introduzca el tipo: ");
        let description: string | null = prompt("Introduzca la descripción: ");
        let dangerousLevel: number | null = Number(prompt("Introduzca el nivel de peligrosidad: "));
        let locationid: string | null = prompt("Introduce el ID de la localización donde se despliega: ");
        
        if (itemid && name && inventor && type && description && dangerousLevel && locationid) {
            if (type != 'Arma' && type != 'Dispositivo de viaje' && type != 'Objeto cotidiano absurdo' && type != 'Biotecnología') {
              console.log("Tipo de invento no válido");
            } else {
              const characterCRUD = new CharacterCRUD();
              const inventorObj = characterCRUD.read(inventor);
              if (!inventorObj) throw new Error(`El inventor es undefined.`);
              const item = new Item(itemid, name, description, inventorObj, type, dangerousLevel);
              gestor.crudManager = new ItemCRUD();
              gestor.add(item);
              const deployEvent = new DeployEvent(itemid, locationid);
              const event = new EventClass(deployEvent);
              event.register();
              gestor.addEvent(event);
            }
            
        } else {
          console.log("Error con alguno de los valores");
        }
        break;
    case 'del':
        let deleteid: string | null = prompt("Introduce el ID del invento: ");
        let locationidDel: string | null = prompt("Introduce el ID de la localización donde se despliega: ");
        if (deleteid && locationidDel) {
          gestor.crudManager = new ItemCRUD();
          gestor.delete(deleteid);
          const neutralizationEvent = new NeutralizationEvent(deleteid, locationidDel);
          const event = new EventClass(neutralizationEvent);
          event.register();
          gestor.addEvent(event);
        }
        break;
    case 'mod':
        let modid: string | null = prompt("Introduce el ID del invento a modificar: ");
        let newName: string | null = prompt("Introduzca el nombre: ");
        let newInventor: string | null = prompt("Introduzca el ID del inventor: ");
        let newType: string | null = prompt("Introduzca el tipo: ");
        let newDescription: string | null = prompt("Introduzca la descripción: ");
        let newDangerousLevel: number | null = Number(prompt("Introduzca el nivel de peligrosidad: "));
        
        if (modid && newName && newInventor && newType && newDescription && newDangerousLevel) {
            if (newType != 'Arma' && newType != 'Dispositivo de viaje' && newType != 'Objeto cotidiano absurdo' && newType != 'Biotecnología') {
              console.log("Tipo de invento no válido");
            } else {
              const characterCRUD = new CharacterCRUD();
              const inventorObj = characterCRUD.read(newInventor);
              if(!inventorObj) throw new Error(`El inventor es undefined.`);
              const item = new Item(modid, newName, newDescription, inventorObj, newType, newDangerousLevel);
              gestor.crudManager = new ItemCRUD();
              gestor.update(modid, item);
            }
            
        } else {
          console.log("Error con alguno de los valores");
        }
        break;
    default: 
        console.log("Volviendo...");
        break;
  }
}

async function menuCRUDLocation(gestor: MultiverseManager) {
    const respuesta = await prompts({
    type: 'select',
    name: 'tipo',
    message: '¿Qué operación deseas hacer?',
    choices: [
        { title: 'Añadir', value: 'add' },
        { title: 'Borrar', value: 'del' },
        { title: 'Modificar', value: 'mod' },
        { title: 'Volver', value: 'volver' }
    ]
  });

  switch (respuesta.tipo) {
    case 'add':
        let locationid: string | null = prompt("Introduce el ID de la localización: ");
        let name: string | null = prompt("Introduzca el nombre: ");
        let dimensionid: string | null = prompt("Introduzca el id de la dimensión: ");
        let description: string | null = prompt("Introduzca la descripción: ");
        let type: string | null = prompt("Introduzca el tipo: ");
        let population: number | null = Number(prompt("Introduzca la población: "));

        if (locationid && name && dimensionid && description && type && population) {
            if (type != 'Estación espacial' && type != 'Planeta' && type != 'Dimensión de bolsillo' && type != 'Simulación virtual') {
              console.log("Tipo de localización no válido");
            } else {
              const dimensionCRUD = new DimensionCRUD();
              const dimension = dimensionCRUD.read(dimensionid);
              if (!dimension) throw new Error(`La dimension es undefined.`);
              const location = new Location(locationid, name, description, type, dimension, population);
              gestor.crudManager = new LocationCRUD();
              gestor.add(location);
            }
        } else {
          console.log("Error con alguno de los valores");
        }
        
        break;
    case 'del':
        let deleteid: string | null = prompt("Introduce el ID de la localización: ");
        if (deleteid) {
          gestor.crudManager = new LocationCRUD();
          gestor.delete(deleteid);
        }
        break;
    case 'mod':
        let modid: string | null = prompt("Introduce el ID de la localización a modificar: ");
        let newName: string | null = prompt("Introduzca el nombre: ");
        let newDimensionid: string | null = prompt("Introduzca el id de la dimensión: ");
        let newDescription: string | null = prompt("Introduzca la descripción: ");
        let newType: string | null = prompt("Introduzca el tipo: ");
        let newPopulation: number | null = Number(prompt("Introduzca la población: "));

        if (modid && newName && newDimensionid && newDescription && newType && newPopulation) {
            if (newType != 'Estación espacial' && newType != 'Planeta' && newType != 'Dimensión de bolsillo' && newType != 'Simulación virtual') {
              console.log("Tipo de localización no válido");
            } else {
              const dimensionCRUD = new DimensionCRUD();
              const dimension = dimensionCRUD.read(newDimensionid);
              if (!dimension) throw new Error(`La dimension es undefined.`);
              const location = new Location(modid, newName, newDescription, newType, dimension, newPopulation);
              gestor.crudManager = new LocationCRUD();
              gestor.update(modid, location);
            }
        } else {
          console.log("Error con alguno de los valores");
        }
        break;
    default: 
        console.log("Volviendo...");
        break;
  }
}

async function menuCRUDSpecies(gestor: MultiverseManager) {
    const respuesta = await prompts({
    type: 'select',
    name: 'tipo',
    message: '¿Qué operación deseas hacer?',
    choices: [
        { title: 'Añadir', value: 'add' },
        { title: 'Borrar', value: 'del' },
        { title: 'Modificar', value: 'mod' },
        { title: 'Volver', value: 'volver' }
    ]
  });

  switch (respuesta.tipo) {
    case 'add':
        let speciesid: string | null = prompt("Introduce el ID de la especie: ");
        let name: string | null = prompt("Introduzca el nombre: ");
        let locationid: string | null = prompt("Introduzca el id de la localización: ");
        let description: string | null = prompt("Introduzca la descripción: ");
        let averageLifespan: number | null = Number(prompt("Introduzca la esperanza de vida media: "));
        let type: string | null = prompt("Introduzca el tipo: ");

        if (speciesid && name && locationid && description && averageLifespan && type) {
            if (type != 'Humanoide' && type != 'Amorfo' && type != 'Parásito' && type != 'Robótico' && type != 'Hivemind') {
              console.log("Tipo de especie no válido");
            } else {
              const locationCRUD = new LocationCRUD();
              const location = locationCRUD.read(locationid);
              if (!location) throw new Error(`La localización es undefined.`);
              const species = new Species(speciesid, name, description, location, type, averageLifespan);
              gestor.crudManager = new SpeciesCRUD();
              gestor.add(species);
            }
        } else {
          console.log("Error con alguno de los valores");
        }
        break;
    case 'del':
        let deleteid: string | null = prompt("Introduce el ID de la especie: ");
        if (deleteid) {
          gestor.crudManager = new SpeciesCRUD();
          gestor.delete(deleteid);
        }
        break;
    case 'mod':
        let modid: string | null = prompt("Introduce el ID de la especie a modificar: ");
        let newName: string | null = prompt("Introduzca el nombre: ");
        let newLocationid: string | null = prompt("Introduzca el id de la localización: ");
        let newDescription: string | null = prompt("Introduzca la descripción: ");
        let newAverageLifespan: number | null = Number(prompt("Introduzca la esperanza de vida media: "));
        let newType: string | null = prompt("Introduzca el tipo: ");

        if (modid && newName && newLocationid && newDescription && newAverageLifespan && newType) {
            if (newType != 'Humanoide' && newType != 'Amorfo' && newType != 'Parásito' && newType != 'Robótico' && newType != 'Hivemind') {
              console.log("Tipo de especie no válido");
            } else {
              const locationCRUD = new LocationCRUD();
              const location = locationCRUD.read(newLocationid);
              if (!location) throw new Error(`La localización es undefined.`);
              const species = new Species(modid, newName, newDescription, location, newType, newAverageLifespan);
              gestor.crudManager = new SpeciesCRUD();
              gestor.update(modid, species);
            }
        } else {
          console.log("Error con alguno de los valores");
        }
    
        break;
    default: 
        console.log("Volviendo...");
        break;
  }
}

async function menuCRUDEvent(gestor: MultiverseManager) {
    const prompt = promptSync();
    const respuesta = await prompts({
    type: 'select',
    name: 'tipo',
    message: '¿Qué operación deseas hacer?',
    choices: [
        { title: 'Añadir viaje interdimensional', value: 'add' },
        { title: 'Volver', value: 'volver' }
    ]
  });

  switch (respuesta.tipo) {
    case 'add':
        let characterid: string | null = prompt("Introduce el ID del personaje que viaja: ");
        let destinationid: string | null = prompt("Introduce el ID de la dimensión de destino: ");
        let reason: string | null = prompt("Introduzca la razón del viaje: ");
        let date: string | null = prompt("Introduzca la fecha del viaje (YYYY-MM-DD): ");

        if (characterid && destinationid && reason && date) {
            const travelEvent = new TravelEvent(characterid, destinationid, new Date(date), reason);
            const event = new EventClass(travelEvent);
            event.register();
            gestor.addEvent(event);
        } else {
          console.log("Error con alguno de los valores");
        }
        break;
    default: 
        console.log("Volviendo...");
        break;
  }
}

async function menuConsultas(gestor: MultiverseManager) {
    const respuesta = await prompts({
        type: 'select',
        name: 'tipo',
        message: '¿Qué consulta deseas realizar?',
        choices: [
            { title: '1. Consultar personajes', value: 'char' },
            { title: '2. Consultar localizaciones', value: 'loc' },
            { title: '3. Consultar Inventos', value: 'item' },
            { title: 'Volver al menú principal', value: 'volver' }
        ]
    });

    switch (respuesta.tipo) {
        case 'char':
            await menuConsultaPersonajes(gestor);
            break;
        case 'loc':
            await menuConsultaLocalizaciones(gestor);
            break;
        case 'item':
            await menuConsultaInventos(gestor);
            break;
        default:
            console.log("Volviendo al menú principal...");
            break;
    }
}

async function menuConsultaPersonajes(gestor: MultiverseManager) {
    const respuesta = await prompts({
        type: 'select',
        name: 'filtro',
        message: '¿Qué filtro deseas aplicar a los personajes?',
        choices: [
            { title: '1. Filtrar por dimensión de origen', value: 'dimension' },
            { title: '2. Filtrar por especie', value: 'species' },
            { title: '3. Filtrar por afiliación', value: 'affiliation' },
            { title: '4. Filtar por estado (vivo/muerto/desconocido/robot-sustituto)', value: 'status' },
            { title: '5. Filtrar por nombre', value: 'name' },
            { title: 'Volver al menú anterior', value: 'volver' }
        ]
    });

    switch (respuesta.filtro) {
        case 'dimension':
            let dimensionid: string | null = prompt("Introduce el ID de la dimensión de origen: ");
            if (dimensionid) {
                console.log(gestor.filterCharactersByDimension(dimensionid));
            }
            break;
        case 'species':
            let speciesName: string | null = prompt("Introduce el nombre de la especie: ");
            if (speciesName) {
                console.log(gestor.filterCharactersBySpecies(speciesName));
            }
            break;
        case 'affiliation':
            let affiliation: string | null = prompt("Introduce la afiliación: ");
            if (affiliation) {
                console.log(gestor.filterCharactersByAffiliation(affiliation));
            }
            break;
        case 'status':
            let status: string | null = prompt("Introduce el estado (vivo/muerto/desconocido/robot-sustituto): ");
            let op1: string | null = prompt("¿Quieres que la búsqueda sea por inteligencia? (s/n): ");
            let op2: string | null = prompt("¿Quieres que la búsqueda sea ascendente? (s/n): ");
            if (status && op1 && op2) {
                const sortByIntelligence = op1.toLowerCase() === 's';
                const op1Value = sortByIntelligence ? "intelligence" : "name";
                const ascending = op2.toLowerCase() === 's';
                const op2Value = ascending ? "asc" : "desc";
                console.log(gestor.consultCharacterByState(status, op1Value, op2Value));
            }
            break;
        case 'name':
            let name: string | null = prompt("Introduce el nombre o parte del nombre: ");
            let op1: string | null = prompt("¿Quieres que la búsqueda sea por inteligencia? (s/n): ");
            let op2: string | null = prompt("¿Quieres que la búsqueda sea ascendente? (s/n): ");
            if (name && op1 && op2) {
                const sortByIntelligence = op1.toLowerCase() === 's';
                const op1Value = sortByIntelligence ? "intelligence" : "name";
                const ascending = op2.toLowerCase() === 's';
                const op2Value = ascending ? "asc" : "desc";
                gestor.consultCharacterByName(name, op1Value, op2Value);
            }
            break;
        default:
            console.log("Volviendo al menú anterior...");
            break;
    }
}

// ==========================================
// 3. MENÚ PRINCIPAL Y ARRANQUE
// ==========================================
async function main() {
    console.clear();
    console.log("==================================================");
    console.log("INICIANDO PROTOCOLOS DEL MULTIVERSO");
    console.log("==================================================\n");

    await seedDatabase();
    
    // 2. Instanciar el Cerebro
    const gestor = MultiverseManager.getInstance();
    let salir = false;

    // 3. Bucle infinito para mantener el programa vivo
    while (!salir) {
        const respuesta = await prompts({
            type: 'select',
            name: 'opcion',
            message: ' MENÚ PRINCIPAL \n¿Qué deseas hacer?',
            choices: [
                { title: ' 1. Gestión Básica (Añadir/Borrar/Modificar)', value: 'crud' },
                { title: ' 2. Consultas y Filtros Avanzados', value: 'consultas' },
                { title: ' 3. Informes Globales', value: 'informes' },
                { title: ' 4. Comprobar Estado (Anomalías)', value: 'estado' },
                { title: ' 5. Salir del Sistema', value: 'salir' }
            ]
        });

        switch (respuesta.opcion) {
            case 'informes':
                await menuInformes(gestor);
                break;

            case 'estado':
                console.log("\n--- ESCANEANDO EL TEJIDO DE LA REALIDAD ---");
                // NOTA: Como este método devuelve un ARRAY de Strings (string[]), 
                // no podemos hacer un solo log. Tenemos que recorrer la lista (bucle for).
                const alertas = gestor.controlStateMultiverse(); 
                
                if (alertas && alertas.length > 0) {
                    for (const alerta of alertas) {
                        console.log(alerta);
                    }
                } else {
                    console.log("El multiverso está estable.");
                }
                console.log("-------------------------------------------\n");
                break;

            case 'crud':
                await menuCRUD(gestor);
                break;

            case 'consultas':
                await menuConsultas(gestor);
                console.log("\n[!] Módulo en construcción. Empezaremos con él pronto...\n");
                break;

            case 'salir':
            default: // Por si el usuario pulsa Ctrl+C para forzar la salida
                salir = true;
                console.log("\nApagando el portal... ¡Hasta la próxima, pedazo de Jerry!\n");
                break;
        }
    }
}

// ==========================================
// ARRANQUE DE LA APLICACIÓN
// ==========================================
main();