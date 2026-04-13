import React, { useState, useCallback } from 'react';
import { Fretboard, NoteHighlight } from '../components/Fretboard';
import {
  ChromaticNote,
  getNoteAtFret,
  getAllPositionsOfNote,
  getRandomNote,
} from '../data/notes';

type FeedbackState = 'idle' | 'correct' | 'wrong';

interface ClickResult {
  string: number;
  fret: number;
  correct: boolean;
}

export const FindNote: React.FC = () => {
  const [targetNote, setTargetNote] = useState<ChromaticNote>(getRandomNote);
  const [lastClick, setLastClick] = useState<ClickResult | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const advance = useCallback(() => {
    setTargetNote(getRandomNote());
    setLastClick(null);
    setFeedback('idle');
  }, []);

  const handleFretClick = useCallback(
    (str: number, fret: number) => {
      if (feedback !== 'idle') return;

      const clickedNote = getNoteAtFret(str, fret);
      const isCorrect = clickedNote === targetNote;

      setLastClick({ string: str, fret, correct: isCorrect });
      setFeedback(isCorrect ? 'correct' : 'wrong');
      setTotal((t) => t + 1);
      if (isCorrect) setCorrect((c) => c + 1);

      if (isCorrect) {
        // show all correct positions briefly, then advance
        setTimeout(advance, 1600);
      } else {
        // clear wrong highlight and let user try again
        setTimeout(() => {
          setLastClick(null);
          setFeedback('idle');
        }, 900);
      }
    },
    [feedback, targetNote, advance],
  );

  const highlights: NoteHighlight[] = [];

  if (feedback === 'correct' && lastClick) {
    // Show all correct positions
    getAllPositionsOfNote(targetNote).forEach((pos) => {
      highlights.push({
        string: pos.string,
        fret: pos.fret,
        color: '#22c55e',
        label: targetNote,
      });
    });
  } else if (feedback === 'wrong' && lastClick) {
    highlights.push({
      string: lastClick.string,
      fret: lastClick.fret,
      color: '#ef4444',
      label: getNoteAtFret(lastClick.string, lastClick.fret),
    });
  }

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <h2 className="exercise-title">Find the Note</h2>
        <p className="exercise-subtitle">
          Click any position on the fretboard where this note appears:
        </p>
        <div className="score-badge">
          {correct}/{total}
        </div>
      </div>

      <div className="target-note-display">
        <span className="target-note-label">Find:</span>
        <span className="target-note-name">{targetNote}</span>
      </div>

      <div className="feedback-banner" data-state={feedback}>
        {feedback === 'correct' && '✓ Correct! Here are all positions'}
        {feedback === 'wrong' && '✗ That is not the right note — try again'}
        {feedback === 'idle' && '\u00a0'}
      </div>

      <Fretboard
        highlights={highlights}
        onFretClick={handleFretClick}
        interactive
      />
    </div>
  );
};
