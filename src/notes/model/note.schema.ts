import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { NoteModel } from './note.model';
import { Document } from 'mongoose';

@Schema()
export class Note extends Document implements NoteModel {

  @Prop({ type: String, required: true, maxlength: 40 })
  description: string

}

export const NoteSchema = SchemaFactory.createForClass(Note);


