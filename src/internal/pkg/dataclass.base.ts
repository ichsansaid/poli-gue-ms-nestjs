export class DataClass<T> {
  // constructor(data: Partial<T>) {
  //   if (data != null) {
  //     const keys = Object.keys(data);
  //     for (const key in keys) {
  //       if (key in this) {
  //         if (this[key] != data[key]) {
  //           this[key] = data[key];
  //         }
  //       }
  //     }
  //   }
  // }

  private init_value(data: Partial<T>) {
    const keys = Object.keys(data);
    for (const key in keys) {
      if (key in this) {
        if (this[key] != data[key]) {
          this[key] = data[key];
        }
      }
    }
  }
}
