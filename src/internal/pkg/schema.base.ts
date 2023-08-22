export abstract class EntityBase {
  public _changes_value = {};

  constructor(data: any) {
    this.assign(data);
  }

  public assign(data: any) {
    const keys = Object.keys(data);
    for (const key in keys) {
      if (key in this) {
        if (this[key] != data[key]) {
          this[key] = data[key];
          this._changes_value[key] = data[key];
        }
      }
    }
    return this;
  }
  public getChanges() {
    return this._changes_value;
  }
}
