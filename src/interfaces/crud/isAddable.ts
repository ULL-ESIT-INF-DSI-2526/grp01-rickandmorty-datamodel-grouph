export interface isAddable<T> {
  add(item: T): Promise<void>;
}