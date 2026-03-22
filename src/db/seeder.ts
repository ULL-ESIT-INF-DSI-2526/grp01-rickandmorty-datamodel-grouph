import { database } from "./db.js";
import { Dimension } from "../classes/dimension.js";
import { Species } from "../classes/species.js";
import { Character } from "../classes/character.js";
import { Location } from "../classes/location.js";
import { Item } from "../classes/item.js";

export async function seedDatabase() {
  if (database.data.personajes.length > 0) {
    return;
  }

  console.log("Preparando el multiverso inicial")

  try {
    const dimension1 = new Dimension("C-137", "Dimensión Canónica", "La dimensión original de Rick y Morty", "Activa", 6);
    const dimension2 = new Dimension("D-99", "Dimensión alternativa similar", "Una dimensión alternativa con una historia diferente", "Activa", 4);
    const dimension3 = new Dimension("E123", "Dimensión exotica", "Una dimensión exótica con características únicas", "Destruida", 2);
    const dimension4 = new Dimension("F-456A", "Dimensión futurista", "Una dimensión futurista con tecnología avanzada", "Activa", 10);
    const dimension5 = new Dimension("G-789B", "Dimensión post-apocalíptica", "Una dimensión post-apocalíptica con un ambiente hostil", "Destruida", 1);
    const dimension6 = new Dimension("H-321C", "Dimensión desconocida", "Una dimensión desconocida con misterios por descubrir", "Activa", 2);
    const dimension7 = new Dimension("I-654", "Dimensión de bolsillo", "Una dimensión de bolsillo con espacio limitado", "Activa", 5);
    const dimension8 = new Dimension("J-987", "Dimensión de ensueño", "Una dimensión de ensueño con paisajes surrealistas", "Activa", 3);
    const dimension9 = new Dimension("K-111", "Dimensión de pesadilla", "Una dimensión de pesadilla con criaturas aterradoras", "Destruida", 1);
    const dimension10 = new Dimension("L-222", "Dimensión de la realidad alternativa", "Una dimensión de la realidad alternativa con eventos históricos diferentes", "Activa", 4);
    const dimension11 = new Dimension("M34A", "Dimension tóxica", "Un verdero físico de la toxicidad psicológica", "Activa", 3);
    const dimension12 = new Dimension("N-555", "Dimensión de la paradoja", "Una dimensión de la paradoja con eventos contradictorios", "Destruida", 2);
    const dimension13 = new Dimension("O-666", "Dimensión de la locura", "Una dimensión de la locura con un ambiente caótico", "Activa", 1);
    const dimension14 = new Dimension("P-777", "Dimensión de la utopía", "Una dimensión de la utopía con una sociedad perfecta", "Activa", 10);
    const dimension15 = new Dimension("Q-888", "Dimensión de la distopía", "Una dimensión de la distopía con una sociedad opresiva", "Destruida", 2);
  
    //20 localizaciones repartidas por diversas dimensiones, con diferentes tipos y poblaciones
    const location1 = new Location("L-01", "Tierra (C-137)", "El planeta de origen de Rick y Morty", "Planeta", dimension1, 10000000000);
    const location2 = new Location("L-02", "Ciudadela de los Ricks", "Una ciudadela donde viven muchos Ricks de diferentes dimensiones", "Estación espacial", dimension1, 100000);
    const location3 = new Location("L-03", "Planeta Gazorpazorp", "Un planeta habitado por una especie violenta y matriarcal", "Planeta", dimension2, 500000000);
    const location4 = new Location("L-04", "Planeta Plutón", "Un planeta helado y desolado en el sistema solar de la Tierra", "Planeta", dimension1, 2);
    const location5 = new Location("L-05", "Planeta Whale", "Un planeta habitado por ballenas gigantes", "Planeta", dimension3, 300000000);
    const location6 = new Location("L-06", "Planeta Cronenberg", "Un planeta donde todos los seres vivos han sido mutados en criaturas horribles", "Planeta", dimension5, 1000000);
    const location7 = new Location("L-07", "Planeta Squanch", "Un planeta habitado por una especie de gatos antropomórficos llamados Squanchy", "Planeta", dimension4, 200000000);
    const location8 = new Location("L-08", "Parque anatómico", "Un parque temático ubicado dentro del cuerpo de una persona, donde los visitantes pueden explorar diferentes órganos y sistemas del cuerpo humano", "Dimensión de bolsillo", dimension7, 1000); 
    const location9 = new Location("L-09", "Simulacion de los mini-Ricks", "Una simulacion habitado por versiones miniatura de Rick y Morty", "Simulación virtual", dimension11, 100000);
    const location10 = new Location("L-10", "Cubo de los Meeseeks", "Un Cubo habitado por criaturas azules llamadas Meeseeks, que existen para cumplir un propósito específico y luego desaparecen", "Dimensión de bolsillo", dimension6, 1000000);
    const location11 = new Location("L-11", "base de la federación galáctica", "Una base militar de la federación galáctica, una organización que controla gran parte del universo conocido", "Estación espacial", dimension1, 500000);
    const location12 = new Location("L-12", "Planeta de las familias señuelo", "Un planeta habitado por familias señuelo, que son utilizadas por los Ricks para proteger a sus familias", "Planeta", dimension8, 100000000);
    const location13 = new Location("L-13", "Planeta de los perros parlantes", "Un planeta habitado por perros parlantes que son tratados como ciudadanos de segunda clase", "Planeta", dimension9, 50000000);
    const location14 = new Location("L-14", "Planeta de los gatos parlantes", "Un planeta habitado por gatos parlantes que son tratados como ciudadanos de primera clase", "Planeta", dimension10, 50000000);
    const location15 = new Location("L-15", "Planeta de los insectos gigantes", "Un planeta habitado por insectos gigantes que son considerados plagas por los habitantes del planeta", "Planeta", dimension12, 100000000);
    const location16 = new Location("L-16", "Simulacion de los robots asesinos", "Un simulacio habitada por robots asesinos que fueron creados para proteger a la humanidad pero se volvieron contra ella", "Simulación virtual", dimension13, 100000);
    const location17 = new Location("L-17", "Naboon", "Un planeta habitado por una especie de seres acuáticos llamados Nabonianos", "Planeta", dimension14, 200000000);
    const location18 = new Location("L-18", "Dagobah", "Un planeta pantanoso y peligroso, habitado por criaturas hostiles y con una atmósfera tóxica", "Planeta", dimension15, 50000000);
    const location19 = new Location("L-19", "Planeta de los robots de cocina", "Un planeta habitado por robots de cocina que son utilizados por los habitantes del planeta para preparar sus alimentos", "Planeta", dimension12, 100000000);
    const location20 = new Location("L-20", "Simulacion de los universos paralelos", "Una simulación habitada por versiones alternativas de Rick y Morty que existen en diferentes universos paralelos", "Simulación virtual", dimension15, 1000000);

    //10 especies con sus caracteristicas propias
    const species1 = new Species("S-01", "Humano", "La especie humana, caracterizada por su inteligencia y adaptabilidad", location1, "Humanoide", 80);
    const species2 = new Species("S-02", "Cronenberg", "Una especie mutada que surgió después de un experimento fallido de Rick, caracterizada por su apariencia grotesca y su agresividad", location6, "Parásito", 50);
    const species3 = new Species("S-03", "Squanchy", "Una especie de gatos antropomórficos llamados Squanchy, caracterizados por su amor por la fiesta y el alcohol", location7, "Amorfo", 20);
    const species4 = new Species("S-04", "Meeseeks", "Una especie de criaturas azules llamadas Meeseeks, que existen para cumplir un propósito específico y luego desaparecen", location10, "Humanoide", 1);
    const species5 = new Species("S-05", "Naboniano", "Una especie de seres acuáticos llamados Nabonianos, caracterizados por su piel verde y su capacidad para respirar bajo el agua", location17, "Amorfo", 100);
    const species6 = new Species("S-06", "Insecto gigante", "Una especie de insectos gigantes que son considerados plagas por los habitantes del planeta", location15, "Parásito", 5);
    const species7 = new Species("S-07", "Perro parlante", "Una especie de perros parlantes que son tratados como ciudadanos de segunda clase", location13, "Humanoide", 15);
    const species8 = new Species("S-08", "Gato parlante", "Una especie de gatos parlantes que son tratados como ciudadanos de primera clase", location14, "Humanoide", 20);
    const species9 = new Species("S-09", "Robot de cocina", "Una especie de robots de cocina que son utilizados por los habitantes del planeta para preparar sus alimentos", location19, "Robótico", 10);
    const species10 = new Species("S-10", "Mente colmena", "Una especie de seres con una mente colmena que pueden controlar a otros seres a través de la telepatía", location20, "Hivemind", 1000);
  
    //30 personajes incluyendo versiones alternativas de un mismo individuo procedentes de distintas dimensiones.
    const character1 = new Character("C-01", "Rick Sanchez", "Un científico brillante pero alcohólico y cínico, conocido por sus aventuras interdimensionales y su relación complicada con su familia", species1, dimension1, "Vivo", "Familia Smith", 10);
    const character2 = new Character("C-02", "Morty Smith", "El nieto de Rick, un adolescente inseguro y torpe que a menudo se ve arrastrado a las aventuras de su abuelo", species1, dimension1, "Vivo", "Familia Smith", 5);
    const character3 = new Character("C-03", "Summer Smith", "La hermana mayor de Morty, una adolescente popular y segura de sí misma que a menudo se siente excluida de las aventuras de su abuelo", species1, dimension1, "Vivo", "Familia Smith", 7);
    const character4 = new Character("C-04", "Beth Smith", "La madre de Morty y Summer, una veterinaria que a menudo se siente insatisfecha con su vida y su matrimonio con Jerry", species1, dimension1, "Vivo", "Familia Smith", 8);
    const character5 = new Character("C-05", "Jerry Smith", "El padre de Morty y Summer, un hombre inseguro y mediocre que a menudo se siente eclipsado por su esposa y su suegro", species1, dimension1, "Vivo", "Familia Smith", 4);
    const character6 = new Character("C-06", "Rick Sanchez (D-99)", "Una versión alternativa de Rick que proviene de la dimensión D-99, donde tuvo una historia diferente y una relación diferente con su familia", species1, dimension2, "Vivo", "Independiente", 9);
    const character7 = new Character("C-07", "Morty malvado", "Una versión alternativa de Morty que proviene de una dimensión donde se volvió malvado y se convirtió en un villano", species1, dimension3, "Vivo", "Independiente", 6);
    const character8 = new Character("C-08", "Rick clon", "Una versión alternativa de Rick que es un clon creado por el Consejo de Ricks para reemplazar a un Rick original que fue asesinado", species1, dimension4, "Vivo", "Consejo de Ricks", 8);
    const character9 = new Character("C-09", "Morty clon", "Una versión alternativa de Morty que es un clon creado por el Consejo de Ricks para reemplazar a un Morty original que fue asesinado", species1, dimension4, "Vivo", "Consejo de Ricks", 5);
    const character10 = new Character("C-10", "Rick robot", "Una versión alternativa de Rick que es un robot creado por un Rick original para servir como su asistente y compañero de aventuras", species9, dimension5, "Vivo", "Independiente", 7);
    const character11 = new Character("C-11", "Morty robot", "Una versión alternativa de Morty que es un robot creado por un Rick original para servir como su asistente y compañero de aventuras", species9, dimension5, "Vivo", "Independiente", 4);
    const character12 = new Character("C-12", "Rick zombie", "Una versión alternativa de Rick que se convirtió en un zombie después de ser infectado por un virus en una dimensión apocalíptica", species1, dimension6, "Muerto", "Independiente", 3);
    const character13 = new Character("C-13", "Morty zombi", "Una versión alternativa de Morty que se convirtió en un zombie después de ser infectado por un virus en una dimensión apocalíptica", species1, dimension6, "Muerto", "Independiente", 2);
    const character14 = new Character("C-14", "Clon de Beth", "Una versión alternativa de Beth que es un clon creado por un Rick original para reemplazar a una Beth original que fue asesinada", species1, dimension7, "Vivo", "Independiente", 7);
    const character15 = new Character("C-15", "Birdperson", "Un personaje que es mitad humano y mitad pájaro, conocido por su personalidad excéntrica y su relación complicada con los demás personajes", species3, dimension8, "Vivo", "Federación Galáctica", 6);
    const character16 = new Character("C-16", "Squanchy", "Un personaje que es un gato antropomórfico llamado Squanchy, conocido por su amor por la fiesta y el alcohol", species3, dimension7, "Vivo", "Independiente", 5);
    const character17 = new Character("C-17", "Tammy Gueterman", "Un personaje que es una agente de la federación galáctica, conocida por su traición a sus amigos y su lealtad a la federación", species1, dimension1, "Vivo", "Federación Galáctica", 4);
    const character18 = new Character("C-18", "Abradolf Lincler", "Un personaje que es una combinación genética de Abraham Lincoln y cierto personaje historico, conocido por su personalidad inestable y su relación complicada con los demás personajes", species1, dimension9, "Muerto", "Independiente", 5);
    const character19 = new Character("C-19", "Morty toxico", "Una versión alternativa de Morty que se volvió tóxico y peligroso para los demás después de ser expuesto a una sustancia tóxica en una dimensión tóxica", species1, dimension11, "Vivo", "Independiente", 4);
    const character20 = new Character("C-20", "Rick tóxico", "Una versión alternativa de Rick que se volvió tóxico y peligroso para los demás después de ser expuesto a una sustancia tóxica en una dimensión tóxica", species1, dimension11, "Vivo", "Independiente", 8);
    const character21 = new Character("C-21", "Rick pepinillo", "Una versión alternativa de Rick que se convirtió en un pepinillo para evitar ir a terapia, conocido por su ingenio y su capacidad para sobrevivir en situaciones extremas", species2, dimension12, "Vivo", "Familia Smith", 9);
    const character22 = new Character("C-22", "Rick Sanchez (D-222)", "Una versión alternativa de Rick que proviene de la dimensión D-222, donde tuvo una historia diferente y una relación diferente con su familia", species1, dimension13, "Vivo", "Independiente", 7);
    const character23 = new Character("C-23", "Meeseeks anciano", "Una versión alternativa de un Meeseeks que ha existido durante mucho tiempo y ha cumplido muchos propósitos, conocido por su sabiduría y su paciencia", species4, dimension14, "Vivo", "Independiente", 6);
    const character24 = new Character("C-24", "snowball", "Un personaje que es un perro parlante llamado Snowball, conocido por su inteligencia y su deseo de dominar el mundo", species7, dimension13, "Vivo", "Independiente", 8);
    const character25 = new Character("C-25", "Gentlecat", "Un personaje que es un gato parlante llamado Gentlecat, conocido por su elegancia y su actitud despreocupada", species8, dimension14, "Vivo", "Independiente", 7);
    const character26 = new Character("C-26", "Unity", "Un personaje que es una mente colmena llamada Unity, conocida por su capacidad para controlar a otros seres a través de la telepatía y su relación complicada con Rick", species10, dimension15, "Vivo", "Independiente", 9);
    const character27 = new Character("C-27", "Jessica", "Un personaje que es la novia de Morty, conocida por su belleza y su relación complicada con Morty", species1, dimension1, "Vivo", "Independiente", 5);
    const character28 = new Character("C-28", "Rick senador", "Una versión alternativa de Rick que se convirtió en senador, conocido por su habilidad para la política y su deseo de reformar el sistema político", species1, dimension14, "Vivo", "Consejo de Ricks", 7);
    const character29 = new Character("C-29", "Rick policial", "Una versión alternativa de Rick que se convirtió en policía, conocido por su sentido de la justicia y su deseo de proteger a los demás", species1, dimension15, "Vivo", "Consejo de Ricks", 6);
    const character30 = new Character("C-30", "Rick feliz", "Una versión alternativa de Rick que es feliz y optimista, conocido por su actitud positiva y su capacidad para disfrutar de las cosas simples de la vida", species1, dimension10, "Vivo", "Independiente", 8);

    //15 inventos o artefactos de diferente naturaleza y nivel de peligrosidad
    const item1 = new Item("I-01", "Pistola de portales", "Un dispositivo que permite a Rick y Morty viajar entre dimensiones y universos paralelos", character1, "Dispositivo de viaje", 5);
    const item2 = new Item("I-02", "Cubo de los Meeseeks", "Un Cubo que crea criaturas azules llamadas Meeseeks, que existen para cumplir un propósito específico y luego desaparecen", character1, "Biotecnología", 4);
    const item3 = new Item("I-03", "Bomba de cronenoides", "Una bomba que libera una nube de cronenoides, criaturas que pueden mutar a otros seres vivos en formas grotescas", character1, "Arma", 8);
    const item4 = new Item("I-04", "Simulador de realidad virtual", "Un dispositivo que crea una simulación de realidad virtual donde los usuarios pueden experimentar diferentes escenarios y aventuras", character1, "Objeto cotidiano absurdo", 3);
    const item5 = new Item("I-05", "Pistola de rayos láser", "Un arma que dispara rayos láser, utilizada por Rick y otros personajes para defenderse de amenazas y enemigos", character6, "Arma", 6);
    const item6 = new Item("I-06", "Television interdimensional", "Un dispositivo que permite a los usuarios ver programas de televisión de diferentes dimensiones y universos paralelos", character6, "Objeto cotidiano absurdo", 1);
    const item7 = new Item("I-07", "Cinturón de gravedad", "Un dispositivo que permite a los usuarios controlar la gravedad a su alrededor, utilizado por Rick y otros personajes para flotar o caminar por las paredes", character8, "Dispositivo de viaje", 4);
    const item8 = new Item("I-08", "Pistola de congelación", "Un arma que dispara un rayo que congela a los objetivos, utilizada por Rick y otros personajes para defenderse de amenazas y enemigos", character10, "Arma", 5);
    const item9 = new Item("I-09", "Cubo de clonación", "Un Cubo que crea clones de cualquier ser vivo que se coloque dentro de él, utilizado por Rick y otros personajes para crear copias de sí mismos o de otros personajes", character8, "Biotecnología", 7);
    const item10 = new Item("I-10", "Pistola de transformación", "Un arma que dispara un rayo que transforma a los objetivos en diferentes formas o criaturas, utilizada por Rick y otros personajes para defenderse de amenazas y enemigos", character12, "Arma", 6);
    const item11 = new Item("I-11", "Simulador de universos paralelos", "Un dispositivo que crea una simulación de universos paralelos, donde los usuarios pueden experimentar diferentes versiones de sí mismos y de la realidad", character13, "Objeto cotidiano absurdo", 4);
    const item12 = new Item("I-12", "Pistola de control mental", "Un arma que dispara un rayo que controla la mente de los objetivos, utilizada por Rick y otros personajes para manipular a otros personajes o para defenderse de amenazas y enemigos", character20, "Arma", 7);
    const item13 = new Item("I-13", "Cubo de la paradoja", "Un Cubo que crea una paradoja temporal cuando se activa, causando eventos contradictorios y confusos en el tiempo y el espacio", character22, "Dispositivo de viaje", 9);
    const item14 = new Item("I-14", "Pistola de la realidad alternativa", "Un arma que dispara un rayo que altera la realidad a su alrededor, utilizada por Rick y otros personajes para defenderse de amenazas y enemigos o para crear situaciones absurdas", character28, "Arma", 8);
    const item15 = new Item("I-15", "Cubo de la mente colmena", "Un Cubo que permite a los usuarios conectarse a una mente colmena y controlar a otros seres a través de la telepatía, utilizado por Unity para controlar a otros personajes", character26, "Biotecnología", 10);
    
    database.data.dimensiones.push(dimension1, dimension2, dimension3, dimension4, dimension5, dimension6, dimension7, dimension8, dimension9, dimension10, dimension11, dimension12, dimension13, dimension14, dimension15);
    database.data.localizaciones.push(location1, location2, location3, location4, location5, location6, location7, location8, location9, location10, location11, location12, location13, location14, location15, location16, location17, location18, location19, location20);
    database.data.especies.push(species1, species2, species3, species4, species5, species6, species7, species8, species9, species10);
    database.data.personajes.push(character1, character2, character3, character4, character5, character6, character7, character8, character9, character10,
    character11, character12, character13, character14, character15, character16, character17, character18, character19, character20,
    character21, character22, character23, character24, character25, character26, character27, character28, character29, character30);
    database.data.inventos.push(item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15);

    await database.write();
    console.log("Multiverso inicial preparado")
  } catch (error) {
    console.error("Error al preparar el multiverso inicial:", error);
  }
}