export interface isUpdatable<T> {
  update(id: string, item: T): void;
}