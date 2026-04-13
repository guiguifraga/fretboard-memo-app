import React, { useState, useCallback } from 'react';
import { Fretboard, NoteHighlight } from '../components/Fretboard';
import {
  CHROMATIC_NOTES,
  ChromaticNote,
  getNoteAtFret,
  getRandomPosition,
} from '../data/notes';

interface Question {
  string: number;
  fret: number;
  answer: ChromaticNote;
}

type FeedbackState = 'idle' | 'correct' | 'wrong';

function newQuestion(): Question {
  const pos = getRandomPosition();
  return {
    ...pos,
    answer: getNoteAtFret(pos.string, pos.fret),
  };
}

export const IdentifyNote: React.FC = () => {
  const [question, setQuestion] = useState<Question>(newQuestion);
  const [feedback, setFeedback] = useState<FeedbackState>('idle');
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);

  const advance = useCallback(() => {
    setQuestion(newQuestion());
    setFeedback('idle');
  }, []);

  const handleGuess = useCallback(
    (note: ChromaticNote) => {
      if (feedback !== 'idle') return;

      const isCorrect = note === question.answer;
      setFeedback(isCorrect ? 'correct' : 'wrong');
      setTotal((t) => t + 1);
      if (isCorrect) setCorrect((c) => c + 1);

      setTimeout(advance, 1400);
    },
    [feedback, question.answer, advance],
  );

  const highlights: NoteHighlight[] = [
    {
      string: question.string,
      fret: question.fret,
      color:
        feedback === 'correct'
          ? '#22c55e'
          : feedback === 'wrong'
          ? '#ef4444'
          : '#facc15',
      label: feedback !== 'idle' ? question.answer : undefined,
      isQuestion: feedback === 'idle',
    },
  ];

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <h2 className="exercise-title">Identify the Note</h2>
        <p className="exercise-subtitle">
          What note is highlighted on the fretboard?
        </p>
        <div className="score-badge">
          {correct}/{total}
        </div>
      </div>

      <div className="feedback-banner" data-state={feedback}>
        {feedback === 'correct' && '✓ Correct!'}
        {feedback === 'wrong' && `✗ The note was ${question.answer}`}
        {feedback === 'idle' && '\u00a0'}
      </div>

      <Fretboard highlights={highlights} />

      <div className="note-grid">
        {CHROMATIC_NOTES.map((note) => (
          <button
            key={note}
            className="note-btn"
            onClick={() => handleGuess(note)}
            disabled={feedback !== 'idle'}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
};
