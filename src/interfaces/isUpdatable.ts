/**
 * Interface for updating an item in a collection.
 * @template T - The type of the item to be updated.
 */
export interface isUpdatanle<T> {
  update(id: string, item: T): void;
}