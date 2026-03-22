/**
 * Interface for adding an item to a collection.
 * @template T - The type of item to be added.
 */
export interface isAddable<T> {
  add(item: T): Promise<void>;
}