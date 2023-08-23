export class EntityBase<T> {
  constructor(data?: Partial<T>) {
    if (data != null) {
      const keys = Object.keys(data);
      for (const key of keys) {
        this[key] = data[key];
      }
      return this;
    }
  }
}
