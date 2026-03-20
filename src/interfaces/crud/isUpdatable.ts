export interface isUpdatable<T> {
  update(id: string, item: T): Promise <void>;
}