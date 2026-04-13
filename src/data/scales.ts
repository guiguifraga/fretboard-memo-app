import { CHROMATIC_NOTES, ChromaticNote } from './notes';

export interface Scale {
  id: string;
  name: string;
  intervals: number[]; // semitones from root
  category: 'Modes' | 'Pentatonic' | 'Other';
}

export const SCALES: Scale[] = [
  {
    id: 'major',
    name: 'Major (Ionian)',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    category: 'Modes',
  },
  {
    id: 'natural-minor',
    name: 'Natural Minor (Aeolian)',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    category: 'Modes',
  },
  {
    id: 'dorian',
    name: 'Dorian',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    category: 'Modes',
  },
  {
    id: 'phrygian',
    name: 'Phrygian',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    category: 'Modes',
  },
  {
    id: 'lydian',
    name: 'Lydian',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    category: 'Modes',
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    category: 'Modes',
  },
  {
    id: 'locrian',
    name: 'Locrian',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    category: 'Modes',
  },
  {
    id: 'major-pentatonic',
    name: 'Major Pentatonic',
    intervals: [0, 2, 4, 7, 9],
    category: 'Pentatonic',
  },
  {
    id: 'minor-pentatonic',
    name: 'Minor Pentatonic',
    intervals: [0, 3, 5, 7, 10],
    category: 'Pentatonic',
  },
  {
    id: 'blues',
    name: 'Blues',
    intervals: [0, 3, 5, 6, 7, 10],
    category: 'Other',
  },
];

// Colors per scale degree (index = interval index in scale.intervals)
export const DEGREE_COLORS = [
  '#ef4444', // Root    — Red
  '#f97316', // 2nd     — Orange
  '#eab308', // 3rd     — Yellow
  '#22c55e', // 4th     — Green
  '#06b6d4', // 5th     — Cyan
  '#3b82f6', // 6th     — Blue
  '#a855f7', // 7th     — Purple
];

export const DEGREE_NAMES = ['Root', '2nd', '3rd', '4th', '5th', '6th', '7th'];

export function getScaleNotes(root: ChromaticNote, scale: Scale): ChromaticNote[] {
  const rootIdx = CHROMATIC_NOTES.indexOf(root);
  return scale.intervals.map(
    (interval) => CHROMATIC_NOTES[(rootIdx + interval) % 12],
  );
}

export function getScaleDegreeIndex(
  root: ChromaticNote,
  note: ChromaticNote,
  scale: Scale,
): number {
  return getScaleNotes(root, scale).indexOf(note);
}
