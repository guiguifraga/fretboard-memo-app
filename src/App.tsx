import React, { useState } from 'react';
import { IdentifyNote } from './exercises/IdentifyNote';
import { FindNote } from './exercises/FindNote';
import { NoteExplorer } from './exercises/NoteExplorer';
import { ScaleExplorer } from './exercises/ScaleExplorer';

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
      </header>

      <main className="app-main">
        {activeTab === 'identify' && <IdentifyNote />}
        {activeTab === 'find' && <FindNote />}
        {activeTab === 'explore' && <NoteExplorer />}
        {activeTab === 'scale' && <ScaleExplorer />}
      </main>

      <footer className="app-footer">
        <p>Standard tuning · E A D G B E · 24 frets</p>
      </footer>
    </div>
  );
}
