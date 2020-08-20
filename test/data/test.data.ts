import { Note } from '../../src/models/note';
import { lorem, random } from 'faker';

function getRandomNote(): Note {
  return {
    id: random.number(),
    description: lorem.words(2),
  }
}

function getRandomNotes(count = 10): Array<Note> {
  const notes: Array<Note> = [];
  for(let i = 0; i < count; i++) {
    notes.push(getRandomNote());
  }
  return notes;
}

export {
  getRandomNotes,
  getRandomNote
}
