import React from 'react';
import { Search, Calendar, ArrowUpDown } from 'lucide-react';

function ControlPanel({ 
  windowYears, 
  onWindowYearsChange, 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange 
}) {
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleYearsChange = (value) => {
    setIsUpdating(true);
    onWindowYearsChange(value);
    setTimeout(() => setIsUpdating(false), 600);
  };

  return (
    <div className="controls-panel fade-in">
      <div className="controls-grid">
        {/* Search */}
        <div className="control-group">
          <label className="control-label">
            <Search size={16} />
            Rechercher un ETF
          </label>
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Nom, ticker, ISIN..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Window Years Slider */}
        <div className="control-group">
          <label className="control-label">
            <Calendar size={16} />
            Fenêtre d'analyse
            <span className="label-value" style={{ 
              animation: isUpdating ? 'pulse 0.6s ease-in-out' : 'none' 
            }}>
              {windowYears} an{windowYears > 1 ? 's' : ''}
            </span>
          </label>
          <input
            type="range"
            className="range-slider"
            min="1"
            max="10"
            value={windowYears}
            onChange={(e) => handleYearsChange(parseInt(e.target.value))}
            style={{
              background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${((windowYears - 1) / 9) * 100}%, var(--bg-tertiary) ${((windowYears - 1) / 9) * 100}%, var(--bg-tertiary) 100%)`
            }}
          />
        </div>

        {/* Sort Filter */}
        <div className="control-group">
          <label className="control-label">
            <ArrowUpDown size={16} />
            Trier par
          </label>
          <select
            className="select-input"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="cagr-desc">CAGR (Haut → Bas)</option>
            <option value="cagr-asc">CAGR (Bas → Haut)</option>
            <option value="sharpe-desc">Sharpe Ratio (Meilleur)</option>
            <option value="volatility-asc">Volatilité (Faible → Haute)</option>
            <option value="name-asc">Nom (A → Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
