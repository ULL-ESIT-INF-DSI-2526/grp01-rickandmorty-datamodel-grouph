# Gestor de Multiverso de Rick & Morty

## Descripción
En este repositorio, hemos desarrollado un sistema para gestionar dimensiones, personajes, localizaciones, inventos y especies del universo, mediante una interfaz interactiva.

## Estructura
Hemos creado una clase abstracta ``BasicUniversalObject``, que extienden los objetos de nuestro universo (``Dimension``, ``Character``, ``Species``, ``Location`` e ``Item``).  
Hemos implementado un patrón de diseño Strategy para la clase ``EventClass`` y la clase ``isCRUD``.  
Hemos implementado el patrón de diseño Singleton para la clase ``MultiverseManager``.  

## Uso
Para usar el gestor se debe ejecutar ``index.ts``. Al ejecutarse, saldrá un menú por pantalla indicando las distintas opciones del gestor.
Tenga en cuenta, que en algunas ocasiones se pedirá el id del objeto y en otras el nombre (se indicará cual de las dos por pantalla).
Los id de los objetos siguen los siguientes patrones:
- Personajes: C-01, C-02...
- Inventos: I-01, I-02...
- Localizaciones: L-01, L-02..
- Especies: S-01, S-02...
- Dimensiones: Sigue la nomenclatura del Consejo de Ricks (C-137, F-456A,...)

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/U8NqX9JL)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-grouph/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-grouph?branch=main)
[![CI test](https://github.com/ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-grouph/actions/workflows/ci.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2526/grp01-rickandmorty-datamodel-grouph/actions/workflows/ci.yml)
