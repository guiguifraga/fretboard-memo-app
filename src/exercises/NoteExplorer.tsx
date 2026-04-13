import React, { useState } from 'react';
import { Fretboard, NoteHighlight } from '../components/Fretboard';
import {
  CHROMATIC_NOTES,
  ChromaticNote,
  getAllPositionsOfNote,
} from '../data/notes';

export const NoteExplorer: React.FC = () => {
  const [selected, setSelected] = useState<ChromaticNote | null>(null);

  const highlights: NoteHighlight[] =
    selected !== null
      ? getAllPositionsOfNote(selected).map((pos) => ({
          string: pos.string,
          fret: pos.fret,
          color: '#3b82f6',
          label: selected,
        }))
      : [];

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <h2 className="exercise-title">Note Explorer</h2>
        <p className="exercise-subtitle">
          Select a note to see all its positions on the fretboard
        </p>
      </div>

      <div className="note-grid note-grid--explorer">
        {CHROMATIC_NOTES.map((note) => (
          <button
            key={note}
            className={`note-btn${selected === note ? ' note-btn--active' : ''}`}
            onClick={() => setSelected(note === selected ? null : note)}
          >
            {note}
          </button>
        ))}
      </div>

      {selected && (
        <p className="explorer-info">
          <strong>{selected}</strong> appears{' '}
          {getAllPositionsOfNote(selected).length} times in the first 12 frets
        </p>
      )}

      <Fretboard highlights={highlights} />
    </div>
  );
};
