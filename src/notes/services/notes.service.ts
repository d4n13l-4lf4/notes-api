import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from '../model/note.schema';
import { Model } from 'mongoose';
import { NoteModel } from '../model/note.model';

@Injectable()
export class NotesService {


  constructor(@InjectModel(Note.name) private readonly noteModel: Model<Note>) {
  }

  findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  findById(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }


  deleteById(id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const { ok, deletedCount } = await this.noteModel.deleteOne({ _id: id }).exec();
        resolve(!!ok && !!deletedCount);
      } catch (e) {
        reject(e);
      }
    });
  }

  save(note: Pick<NoteModel, 'description'>): Promise<Note> {
    return this.noteModel.create(note);
  }
}
