
export interface BasicCrud<T, ID> {
  findAll(): Array<T>;
  findById(id: ID): T;
  deleteById(id: ID): T;
  save(entity: T): T;
}
