import React, { useState } from 'react';
import { Fretboard, NoteHighlight } from '../components/Fretboard';
import { CHROMATIC_NOTES, ChromaticNote, getNoteAtFret, TOTAL_FRETS, Tuning } from '../data/notes';
import {
  SCALES,
  Scale,
  DEGREE_COLORS,
  DEGREE_NAMES,
  getScaleNotes,
  getScaleDegreeIndex,
} from '../data/scales';

type Category = Scale['category'] | 'All';
const CATEGORIES: Category[] = ['All', 'Modes', 'Pentatonic', 'Other'];

interface Props {
  tuning: Tuning;
}

export const ScaleExplorer: React.FC<Props> = ({ tuning }) => {
  const [root, setRoot] = useState<ChromaticNote>('C');
  const [scaleId, setScaleId] = useState<string>('major');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const scale = SCALES.find((s) => s.id === scaleId) ?? SCALES[0];
  const scaleNotes = getScaleNotes(root, scale);

  const filteredScales =
    activeCategory === 'All'
      ? SCALES
      : SCALES.filter((s) => s.category === activeCategory);

  const highlights: NoteHighlight[] = [];
  for (let str = 0; str < tuning.length; str++) {
    for (let fret = 0; fret <= TOTAL_FRETS; fret++) {
      const note = getNoteAtFret(str, fret, tuning);
      const degreeIdx = getScaleDegreeIndex(root, note, scale);
      if (degreeIdx !== -1) {
        highlights.push({
          string: str,
          fret,
          color: DEGREE_COLORS[degreeIdx],
          label: note,
        });
      }
    }
  }

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <h2 className="exercise-title">Scale & Mode Explorer</h2>
        <p className="exercise-subtitle">
          Choose a root note and a scale to see all degrees on the fretboard
        </p>
      </div>

      {/* Root note selector */}
      <div className="selector-section">
        <label className="selector-label">Root Note</label>
        <div className="note-grid">
          {CHROMATIC_NOTES.map((note) => (
            <button
              key={note}
              className={`note-btn${root === note ? ' note-btn--active note-btn--root' : ''}`}
              onClick={() => setRoot(note)}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Scale category filter */}
      <div className="selector-section">
        <label className="selector-label">Category</label>
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-tab${activeCategory === cat ? ' category-tab--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scale selector */}
      <div className="selector-section">
        <label className="selector-label">Scale / Mode</label>
        <div className="scale-grid">
          {filteredScales.map((s) => (
            <button
              key={s.id}
              className={`scale-btn${scaleId === s.id ? ' scale-btn--active' : ''}`}
              onClick={() => setScaleId(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current selection label */}
      <div className="scale-info">
        <span className="scale-info-name">
          {root} {scale.name}
        </span>
        <span className="scale-info-notes">
          {scaleNotes.join(' – ')}
        </span>
      </div>

      <Fretboard highlights={highlights} tuning={tuning} />

      {/* Degree legend */}
      <div className="degree-legend">
        {scale.intervals.map((_, i) => (
          <div key={i} className="degree-item">
            <span
              className="degree-dot"
              style={{ backgroundColor: DEGREE_COLORS[i] }}
            />
            <span className="degree-name">
              {i === 0 ? 'Root' : DEGREE_NAMES[i]}
              <span className="degree-note"> ({scaleNotes[i]})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
