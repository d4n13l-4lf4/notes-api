import { Injectable } from '@nestjs/common';
import { Note } from '../models/note';
import { InMemoryRepository } from './in-memory-repository';

@Injectable()
export class NotesInMemoryRepositoryService extends InMemoryRepository<Note, number> {
}
