export interface isDeleteable {
  delete(id: string): Promise <void>;
}