import { Note } from './note.model';

export class Label {
    labelId: bigint;
    userId: bigint;
    labelName: string;
    notes: Note[];
}
