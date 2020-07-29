import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {

  findAll() {
    return [];
  }

  findById(id: string) {
    return {id: 1, description: '2'};
  }


}
