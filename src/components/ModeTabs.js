import React from 'react';
import { BarChart3, GitCompare } from 'lucide-react';

function ModeTabs({ mode, onModeChange }) {
  return (
    <div className="mode-tabs fade-in">
      <button
        className={`mode-tab ${mode === 'single' ? 'active' : ''}`}
        onClick={() => onModeChange('single')}
      >
        <BarChart3 size={18} />
        Sélection Unique
      </button>
      <button
        className={`mode-tab ${mode === 'compare' ? 'active' : ''}`}
        onClick={() => onModeChange('compare')}
      >
        <GitCompare size={18} />
        Comparaison Multi-ETF
      </button>
    </div>
  );
}

export default ModeTabs;
