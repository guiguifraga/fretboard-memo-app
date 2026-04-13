import { useState } from 'react';
import { IdentifyNote } from './exercises/IdentifyNote';
import { FindNote } from './exercises/FindNote';
import { NoteExplorer } from './exercises/NoteExplorer';
import { ScaleExplorer } from './exercises/ScaleExplorer';
import { TuningSelector } from './components/TuningSelector';
import { STANDARD_TUNING, TUNING_PRESETS, Tuning } from './data/notes';

type Tab = 'identify' | 'find' | 'explore' | 'scale';

interface TabDef {
  id: Tab;
  label: string;
  icon: string;
}

const TABS: TabDef[] = [
  { id: 'identify', label: 'Identify Note', icon: '🎯' },
  { id: 'find', label: 'Find Note', icon: '🔍' },
  { id: 'explore', label: 'Note Explorer', icon: '🗺️' },
  { id: 'scale', label: 'Scales & Modes', icon: '🎵' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('identify');
  const [tuning, setTuning] = useState<Tuning>([...STANDARD_TUNING]);

  const currentPreset = TUNING_PRESETS.find((p) =>
    p.tuning.every((n, i) => n === tuning[i]),
  );
  // Display tuning from low (6th) to high (1st), conventional notation
  const tuningDisplay = [...tuning].reverse().join(' ');

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-brand">
            <span className="app-brand-icon">🎸</span>
            <h1 className="app-title">Fretboard Memo</h1>
          </div>
          <nav className="app-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`nav-btn${activeTab === tab.id ? ' nav-btn--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-btn-icon">{tab.icon}</span>
                <span className="nav-btn-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <TuningSelector tuning={tuning} onChange={setTuning} />
      </header>

      <main className="app-main">
        {activeTab === 'identify' && <IdentifyNote tuning={tuning} />}
        {activeTab === 'find' && <FindNote tuning={tuning} />}
        {activeTab === 'explore' && <NoteExplorer tuning={tuning} />}
        {activeTab === 'scale' && <ScaleExplorer tuning={tuning} />}
      </main>

      <footer className="app-footer">
        <p>
          {currentPreset ? currentPreset.name : 'Custom'} · {tuningDisplay} · 24 frets  ·  by Guilherme Fraga
        </p>
      </footer>
    </div>
  );
}
