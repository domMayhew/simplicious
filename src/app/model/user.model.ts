import * as uuid from 'uuid';

interface User {
  id: UUID;
  name: string;
}

export class UUID {
  private id: string;

  static randomUUID() { return new UUID(uuid.v4()); }
  static validate = uuid.validate;
  static fromString(id: string) { return new UUID(id); }

  private constructor(id: string) {
    if (!uuid.validate(id)) {
      throw new Error(`Invalid UUID: '${id}'`);
    } else {
      this.id = id;
    }
  }

  toString() { return this.id; }
  equals(uuid: UUID) {
    return this.id === uuid.id;
  }
}

export type { User }