export interface RepositoryBase<T> {
  findOneBy(data: Partial<T>): Promise<T>;
  findAllBy(data: Partial<T>): Promise<T[]>;
  insert(data: Partial<T>): Promise<T>;
  save(data: Partial<T>): Promise<T>;
  deleteOneBy(data: Partial<T>): Promise<T>;
  deleteManyBy(data: Partial<T>): Promise<T>;
  insertMany(data: Partial<T>[]): Promise<T[]>;
  saveMany(data: Partial<T>[]): Promise<T[]>;
}
