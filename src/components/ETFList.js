import React from 'react';
import { TrendingUp, Activity, BarChart2 } from 'lucide-react';

function ETFList({ data, onSelect, isSelected, mode }) {
  if (!data || data.length === 0) {
    return (
      <div className="etf-list-container">
        <div className="empty-state">
          <div className="empty-icon">
            <BarChart2 size={64} />
          </div>
          <div className="empty-text">Aucun ETF trouvé</div>
        </div>
      </div>
    );
  }

  const truncate = (str, maxLength) => {
    if (!str) return 'N/A';
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
  };

  return (
    <div className="etf-list-container">
      {data.map((etf, index) => (
        <div
          key={etf.ticker_original || index}
          className={`etf-item ${isSelected(etf) ? 'selected' : ''}`}
          onClick={() => onSelect(etf)}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="etf-item-header">
            <div className="etf-name">
              {truncate(etf.nom || etf.ticker_original || 'Sans nom', 50)}
            </div>
            <div className="etf-ticker">
              {etf.ticker_original}
            </div>
          </div>
          <div className="etf-metrics">
            <div className="metric">
              <TrendingUp size={14} />
              CAGR: <span className="metric-value">{etf.metrics.avgCagr.toFixed(1)}%</span>
            </div>
            <div className="metric">
              <Activity size={14} />
              Vol: <span className="metric-value">{etf.metrics.volatility.toFixed(1)}%</span>
            </div>
            <div className="metric">
              <BarChart2 size={14} />
              Sharpe: <span className="metric-value">{etf.metrics.sharpe.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ETFList;
