import { isAddable } from "../../interfaces/crud/isAddable.js"
import { isDeleteable } from "../../interfaces/crud/isDeleteable.js"
import { isReadable } from "../../interfaces/crud/isReadable.js"
import { isUpdatable } from "../../interfaces/crud/isUpdatable.js"
import { BasicUniversalObject } from "../basicUniversalObject.js"

export abstract class CRUD<T extends BasicUniversalObject> implements isAddable<T>, isDeleteable, isReadable<T>, isUpdatable<T> {
  constructor() {}
  abstract add(item: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract read(id: string):T;
  abstract update(id: string, item: T): Promise<void>;
}