/**
 * Interface for readable entities.
 * @template T - The type of the entity being read.
 */
export interface isReadable<T> {
  read(id: string): T | undefined;
}