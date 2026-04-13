import React from 'react';
import {
  getNoteAtFret,
  OPEN_STRINGS,
  TOTAL_FRETS,
  SINGLE_MARKER_FRETS,
  DOUBLE_MARKER_FRETS,
} from '../data/notes';

export interface NoteHighlight {
  string: number;
  fret: number;
  color: string;
  label?: string;
  isQuestion?: boolean;
}

interface FretboardProps {
  highlights?: NoteHighlight[];
  onFretClick?: (string: number, fret: number) => void;
  interactive?: boolean;
  showAllNotes?: boolean;
}

const FRETS = Array.from({ length: TOTAL_FRETS + 1 }, (_, i) => i);

// Thickness in px per string (index 0 = high E, 5 = low E)
const STRING_WEIGHTS = [1, 1.5, 2, 2.5, 3, 4];

export const Fretboard: React.FC<FretboardProps> = ({
  highlights = [],
  onFretClick,
  interactive = false,
  showAllNotes = false,
}) => {
  const getHighlight = (s: number, f: number) =>
    highlights.find((h) => h.string === s && h.fret === f);

  return (
    <div className="fretboard-scroll">
      <div className="fretboard">
        {/* Fret numbers header */}
        <div className="fb-row fb-header-row">
          <div className="fb-string-label" />
          {FRETS.map((fret) => (
            <div key={fret} className={`fb-cell fb-header-cell${fret === 0 ? ' fb-open-col' : ''}`}>
              <span className="fb-fret-number">{fret === 0 ? 'Open' : fret}</span>
            </div>
          ))}
        </div>

        {/* Fret position markers row */}
        <div className="fb-row fb-markers-row">
          <div className="fb-string-label" />
          {FRETS.map((fret) => (
            <div key={fret} className={`fb-cell fb-marker-cell${fret === 0 ? ' fb-open-col' : ''}`}>
              {SINGLE_MARKER_FRETS.has(fret) && (
                <span className="fb-dot" />
              )}
              {DOUBLE_MARKER_FRETS.has(fret) && (
                <span className="fb-dot-double">
                  <span className="fb-dot" />
                  <span className="fb-dot" />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* String rows */}
        {OPEN_STRINGS.map((_, stringIdx) => (
          <div key={stringIdx} className="fb-row fb-string-row">
            {/* String number label */}
            <div className="fb-string-label">
              <span className="fb-string-number">{stringIdx + 1}</span>
            </div>

            {/* Fret cells */}
            {FRETS.map((fret) => {
              const highlight = getHighlight(stringIdx, fret);
              const note = getNoteAtFret(stringIdx, fret);
              const isClickable = interactive && !!onFretClick;

              let circleStyle: React.CSSProperties = {};
              let circleClass = 'fb-note-circle';
              let circleContent: React.ReactNode = null;

              if (highlight) {
                circleStyle = { backgroundColor: highlight.color, borderColor: highlight.color };
                circleClass += highlight.isQuestion ? ' fb-note-circle--question' : ' fb-note-circle--highlight';
                circleContent = highlight.isQuestion ? '?' : (highlight.label ?? note);
              } else if (showAllNotes) {
                circleClass += ' fb-note-circle--ghost';
                circleContent = note;
              }

              return (
                <div
                  key={fret}
                  className={[
                    'fb-cell',
                    'fb-fret-cell',
                    fret === 0 ? 'fb-open-col' : '',
                    isClickable ? 'fb-fret-cell--clickable' : '',
                    stringIdx === 0 ? 'fb-first-string' : '',
                    stringIdx === OPEN_STRINGS.length - 1 ? 'fb-last-string' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => isClickable && onFretClick?.(stringIdx, fret)}
                  title={isClickable ? note : undefined}
                >
                  {/* String line */}
                  <div
                    className="fb-string-line"
                    style={{ height: STRING_WEIGHTS[stringIdx] }}
                  />

                  {/* Note circle */}
                  {(highlight || showAllNotes) && (
                    <div className={circleClass} style={circleStyle}>
                      {circleContent}
                    </div>
                  )}

                  {/* Hover ghost for interactive mode */}
                  {isClickable && !highlight && !showAllNotes && (
                    <div className="fb-note-circle fb-note-circle--hover">
                      {note}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
