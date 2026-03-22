/**
 * Interface for deleteable entities.
 */
export interface isDeleteable {
  delete(id: string): Promise <void>;
}