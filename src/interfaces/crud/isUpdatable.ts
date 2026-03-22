/**
 * Interface for the update method in the CRUD operations.
 * @template T - The type of the item to be updated.
 */
export interface isUpdatable<T> {
  update(id: string, item: T): Promise <void>;
} 