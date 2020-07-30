import { BasicCrud } from './basic-crud';

export class InMemoryRepository<T, ID> implements BasicCrud<T, ID>{
  data = [];

  deleteById(id: ID): T {
    const note = this.findById(id);
    this.data = this.data.filter(n => n.id !== id);
    return note;
  }

  findAll(): Array<T> {
    return this.data;
  }

  findById(id: ID): T {
    return this.data.find(n => n.id === id);
  }

  save(entity: T): T {
    this.data.push(entity);
    return entity;
  }

}
