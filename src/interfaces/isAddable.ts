/**
 * Interface representing an object that can have items added to it.
 * @template T - The type of items that can be added.
 */
export interface isAddable<T> {
  add(item: T): void;
}