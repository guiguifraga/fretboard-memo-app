export const CHROMATIC_NOTES = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
] as const;

export type ChromaticNote = (typeof CHROMATIC_NOTES)[number];

// Strings ordered from high (1st) to low (6th) — top to bottom on screen
export const OPEN_STRINGS: ChromaticNote[] = ['E', 'B', 'G', 'D', 'A', 'E'];

// Guitar string numbers for display
export const STRING_NUMBERS = [1, 2, 3, 4, 5, 6];

// Frets with position markers
export const SINGLE_MARKER_FRETS = new Set([3, 5, 7, 9]);
export const DOUBLE_MARKER_FRETS = new Set([12]);

export const TOTAL_FRETS = 12;

export function getNoteAtFret(stringIdx: number, fret: number): ChromaticNote {
  const openNote = OPEN_STRINGS[stringIdx];
  const openIdx = CHROMATIC_NOTES.indexOf(openNote);
  return CHROMATIC_NOTES[(openIdx + fret) % 12];
}

export function getAllPositionsOfNote(
  note: ChromaticNote,
): Array<{ string: number; fret: number }> {
  const positions: Array<{ string: number; fret: number }> = [];
  for (let s = 0; s < 6; s++) {
    for (let f = 0; f <= TOTAL_FRETS; f++) {
      if (getNoteAtFret(s, f) === note) {
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
