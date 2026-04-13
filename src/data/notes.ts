export const CHROMATIC_NOTES = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
] as const;

export type ChromaticNote = (typeof CHROMATIC_NOTES)[number];
export type Tuning = ChromaticNote[];

// Standard tuning: strings ordered from high (1st) to low (6th) — top to bottom on screen
export const STANDARD_TUNING: Tuning = ['E', 'B', 'G', 'D', 'A', 'E'];

// Legacy alias
export const OPEN_STRINGS = STANDARD_TUNING;

export interface TuningPreset {
  id: string;
  name: string;
  tuning: Tuning;
}

export const TUNING_PRESETS: TuningPreset[] = [
  { id: 'standard',       name: 'Standard',      tuning: ['E', 'B', 'G',  'D',  'A',  'E']  },
  { id: 'drop-d',         name: 'Drop D',         tuning: ['E', 'B', 'G',  'D',  'A',  'D']  },
  { id: 'half-step-down', name: 'Eb (½ step ↓)',  tuning: ['D#','A#','F#', 'C#', 'G#', 'D#'] },
  { id: 'full-step-down', name: 'D (1 step ↓)',   tuning: ['D', 'A', 'F',  'C',  'G',  'D']  },
  { id: 'open-g',         name: 'Open G',         tuning: ['D', 'B', 'G',  'D',  'G',  'D']  },
  { id: 'open-d',         name: 'Open D',         tuning: ['D', 'A', 'F#', 'D',  'A',  'D']  },
  { id: 'dadgad',         name: 'DADGAD',         tuning: ['D', 'A', 'G',  'D',  'A',  'D']  },
];

// Guitar string numbers for display
export const STRING_NUMBERS = [1, 2, 3, 4, 5, 6];

// Frets with position markers
export const SINGLE_MARKER_FRETS = new Set([3, 5, 7, 9, 15, 17, 19, 21]);
export const DOUBLE_MARKER_FRETS = new Set([12, 24]);

export const TOTAL_FRETS = 24;

export function getNoteAtFret(
  stringIdx: number,
  fret: number,
  tuning: Tuning = STANDARD_TUNING,
): ChromaticNote {
  const openNote = tuning[stringIdx];
  const openIdx = CHROMATIC_NOTES.indexOf(openNote);
  return CHROMATIC_NOTES[(openIdx + fret) % 12];
}

export function getAllPositionsOfNote(
  note: ChromaticNote,
  tuning: Tuning = STANDARD_TUNING,
): Array<{ string: number; fret: number }> {
  const positions: Array<{ string: number; fret: number }> = [];
  for (let s = 0; s < tuning.length; s++) {
    for (let f = 0; f <= TOTAL_FRETS; f++) {
      if (getNoteAtFret(s, f, tuning) === note) {
        positions.push({ string: s, fret: f });
      }
      
    }
  }
  return positions;
}

export function getRandomPosition(): { string: number; fret: number } {
  return {
    string: Math.floor(Math.random() * 6),
    fret: Math.floor(Math.random() * (TOTAL_FRETS + 1)),
  };
}

export function getRandomNote(): ChromaticNote {
  return CHROMATIC_NOTES[Math.floor(Math.random() * 12)];
}
