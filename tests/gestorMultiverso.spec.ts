import { describe, test, expect, vi } from 'vitest';
import { MultiverseManager } from '../src/classes/gestorMultiverso';
import { database } from '../src/db/db';

vi.spyOn(database, 'write').mockImplementation(async () => {});

describe('GestorMultiverso function tests', () => {
  const gestor = MultiverseManager.getInstance();

  test('El patrón Singleton asegura una única instancia', () => {
    const gestor2 = MultiverseManager.getInstance();
    expect(gestor).toBe(gestor2);
  });

  describe('Consultas y Filtros', () => {
    test('consultCharacterByDimension encuentra personajes de la dimensión C-137', () => {
      const resultados = gestor.consultCharacterByDimension('C-137', 'name', 'asc');
      
      expect(resultados.length).toBeGreaterThan(0);
      
      const nombreReal = resultados[0].name || (resultados[0] as any)._name;
      expect(nombreReal).toBeDefined();
    });
    test('consultCharacterBySpecies encuentra "Humano" ignorando mayúsculas/minúsculas', () => {
      const resultados = gestor.consultCharacterBySpecies('humano', 'name', 'asc');
      
      expect(resultados.length).toBeGreaterThan(0);
      
      const nombreReal = resultados[0].name || (resultados[0] as any)._name;
      expect(nombreReal).toBeDefined();
    });
    
    test('consultCharacterBySpecies arroja error si la especie no existe', () => {
      expect(() => gestor.consultCharacterBySpecies('RazaFantasma', 'name', 'asc'))
        .toThrowError(/no existe en la base de datos/);
    });

    test('consultCharacterByAffiliation encuentra personajes de la Federación Galáctica', () => {
      const resultados = gestor.consultCharacterByAffiliation('Federación Galáctica', 'name', 'asc');
      
      expect(resultados.length).toBeGreaterThan(0);
      
      const nombreReal = resultados[0].name || (resultados[0] as any)._name;
      expect(nombreReal).toBeDefined();
    });

    test('consultCharacterByAffiliation arroja error si la afiliación no existe', () => {
      expect(() => gestor.consultCharacterByAffiliation('AlianzaRebelde', 'name', 'asc'))
        .toThrowError("El personaje con afiliación AlianzaRebelde no existe.");
    });

    test('consultCharacterByState encuentra personajes vivos', () => {
      const resultados = gestor.consultCharacterByState('Vivo', 'name', 'asc');
      
      expect(resultados.length).toBeGreaterThan(0);
      
      const nombreReal = resultados[0].name || (resultados[0] as any)._name;
      expect(nombreReal).toBeDefined();
    });

    test('consultCharacterByName encuentra personajes por nombre parcial', () => {
      const resultados = gestor.consultCharacterByName('Rick', 'name', 'asc');
      
      expect(resultados.length).toBeGreaterThan(0);
      
      const nombreReal = resultados[0].name || (resultados[0] as any)._name;
      expect(nombreReal).toContain('Rick');
    });

    test('consultItemByDanger filtra correctamente por nivel exacto', () => {
      const itemsPeligrosos = gestor.consultItemByDanger(10);
      expect(itemsPeligrosos.length).toBeGreaterThan(0);
      
      const peligroReal = itemsPeligrosos[0].danger || (itemsPeligrosos[0] as any)._danger;
      expect(Number(peligroReal)).toBe(10);
    });

    test('consultItemByInventor encuentra inventos por personaj inventor', () => {
        const inventos = gestor.consultItemByInventor('Rick Sanchez');
        expect(inventos.length).toBeGreaterThan(0);
    });
    
    test('consultItemByType filtra por tipo de invento', () => {
        const inventos = gestor.consultItemByType('Arma');
        expect(inventos.length).toBeGreaterThan(0);
        
        const tipoReal = inventos[0].type || (inventos[0] as any)._type;
        expect(tipoReal).toBeDefined();
    });
    
    test('consultItemByName encuentra inventos por nombre parcial', () => {
        const inventos = gestor.consultItemByName('Pistola de portales');
        expect(inventos.length).toBeGreaterThan(0);
    });

    test('consultLocationByDimension encuentra localizaciones por dimensión', () => {
        const localizaciones = gestor.consultLocationByDimension('C-137');
        expect(localizaciones.length).toBeGreaterThan(0);
    });

    test('consultLocationByType filtra localizaciones por tipo', () => {
        const localizaciones = gestor.consultLocationByType('Planeta');
        expect(localizaciones.length).toBeGreaterThan(0);
    });

    test('consultLocationByName encuentra localizaciones por nombre parcial', () => {
        const localizaciones = gestor.consultLocationByName('Tierra');
        expect(localizaciones.length).toBeGreaterThan(0);
    });
  });

  describe('Informes Globales', () => {
      test('reportInterdimensionalTravels genera el historial de un personaje real', () => {
      const informe = gestor.reportInterdimensionalTravels('Rick Sanchez');
      
      expect(informe).toContain('Viajes interdimensionales registrados para Rick Sanchez');
      expect(informe).toContain('C-137'); 
    });

    test('reportInterdimensionalTravels avisa si no hay viajes', () => {
      const informe = gestor.reportInterdimensionalTravels('Personaje Casero');
      expect(informe).toContain('No hay eventos de viajes');
    });

    test('reportItems muestra los inventos desplegados ignorando los neutralizados', () => {
      const informe = gestor.reportItems();

      expect(informe).toContain('Inventos desplegados en el multiverso');
      expect(informe).toContain('Cronómetro');
    });

    test('reportDimensions muestra las dimensiones activas', () => {
      const informe = gestor.reportDimensions();

      expect(informe).toContain('Dimensiones activas en el multiverso');
      expect(informe).toContain('C-137');
    });

    test('reportCharacter muestra el personaje con más versiones alternativas', () => {
        const informe = gestor.reportCharacter();
        expect(informe).toContain(' Personajes con más versiones alternativas:');
        expect(informe).toContain('RICK');
    });
  });

  describe('Escáner del Multiverso', () => {
    test('controlStateMultiverse devuelve un array de alertas', () => {
      const alertas = gestor.controlStateMultiverse();
      
      expect(Array.isArray(alertas)).toBe(true);
      expect(alertas.length).toBeGreaterThan(0);
    });
  });
});