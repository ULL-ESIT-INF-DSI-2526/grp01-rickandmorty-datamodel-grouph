export interface isReadable<T> {
  read(id: string): T | undefined;
}