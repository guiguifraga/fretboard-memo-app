import React from 'react';
import {
  CHROMATIC_NOTES,
  TUNING_PRESETS,
  Tuning,
  TuningPreset,
} from '../data/notes';

interface TuningSelectorProps {
  tuning: Tuning;
  onChange: (tuning: Tuning) => void;
}

export const TuningSelector: React.FC<TuningSelectorProps> = ({ tuning, onChange }) => {
  const activePreset = TUNING_PRESETS.find((p) =>
    p.tuning.every((n, i) => n === tuning[i]),
  );

  const handlePreset = (preset: TuningPreset) => {
    onChange([...preset.tuning] as Tuning);
  };

  const handleStringNote = (stringIdx: number, note: string) => {
    const next = [...tuning] as Tuning;
    next[stringIdx] = note as Tuning[number];
    onChange(next);
  };

  return (
    <div className="tuning-bar">
      <span className="tuning-label">Tuning</span>

      <div className="tuning-presets">
        {TUNING_PRESETS.map((preset) => (
          <button
            key={preset.id}
            className={`tuning-preset-btn${activePreset?.id === preset.id ? ' tuning-preset-btn--active' : ''}`}
            onClick={() => handlePreset(preset)}
          >
            {preset.name}
          </button>
        ))}
      </div>

      <div className="tuning-strings">
        {tuning.map((note, i) => (
          <div key={i} className="tuning-string">
            <span className="tuning-string-num">{i + 1}</span>
            <select
              className="tuning-string-select"
              value={note}
              onChange={(e) => handleStringNote(i, e.target.value)}
            >
              {CHROMATIC_NOTES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};
