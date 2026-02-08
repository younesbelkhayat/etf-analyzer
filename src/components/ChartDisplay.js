import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, X } from 'lucide-react';

function ChartDisplay({ etf, etfs, windowYears, mode, onRemove }) {
  // Single ETF mode
  if (mode === 'single') {
    if (!etf) {
      return (
        <div className="chart-container">
          <div className="empty-state">
            <TrendingUp className="empty-icon" />
            <div className="empty-text">
              Sélectionnez un ETF pour voir sa performance glissante
            </div>
          </div>
        </div>
      );
    }

    const chartData = etf.rollingReturns.map(r => ({
      date: r.date,
      cagr: parseFloat(r.cagr.toFixed(2))
    }));

    return (
      <div className="chart-container slide-in-right">
        <div className="chart-header">
          <h3 className="chart-title">
            {etf.nom || etf.ticker_original}
          </h3>
          <p className="chart-subtitle">
            Performance glissante sur {windowYears} an{windowYears > 1 ? 's' : ''} • 
            CAGR moyen: {etf.metrics.avgCagr.toFixed(2)}% • 
            Volatilité: {etf.metrics.volatility.toFixed(2)}%
          </p>
        </div>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="cagrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-secondary)"
              tick={{ fill: 'var(--text-secondary)' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getFullYear()}`;
              }}
            />
            <YAxis 
              stroke="var(--text-secondary)"
              tick={{ fill: 'var(--text-secondary)' }}
              label={{ 
                value: 'CAGR (%)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: 'var(--text-secondary)' }
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
              formatter={(value) => [`${value}%`, 'CAGR']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <ReferenceLine y={0} stroke="var(--text-tertiary)" strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              dataKey="cagr" 
              stroke="var(--accent-primary)" 
              strokeWidth={3}
              dot={false}
              fill="url(#cagrGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Compare mode
  if (mode === 'compare') {
    if (!etfs || etfs.length === 0) {
      return (
        <div className="chart-container">
          <div className="empty-state">
            <TrendingUp className="empty-icon" />
            <div className="empty-text">
              Sélectionnez jusqu'à 4 ETFs pour comparer leurs performances
            </div>
          </div>
        </div>
      );
    }

    // Merge all rolling returns by date
    const allDates = new Set();
    etfs.forEach(etf => {
      etf.rollingReturns.forEach(r => allDates.add(r.date));
    });

    const sortedDates = Array.from(allDates).sort();
    
    const chartData = sortedDates.map(date => {
      const dataPoint = { date };
      etfs.forEach(etf => {
        const point = etf.rollingReturns.find(r => r.date === date);
        if (point) {
          dataPoint[etf.ticker_original] = parseFloat(point.cagr.toFixed(2));
        }
      });
      return dataPoint;
    });

    const colors = ['var(--accent-primary)', 'var(--accent-secondary)', '#ff6b35', '#f472b6'];

    return (
      <div className="chart-container fade-in">
        <div className="chart-header">
          <h3 className="chart-title">Comparaison Multi-ETF</h3>
          <p className="chart-subtitle">
            Performance glissante sur {windowYears} an{windowYears > 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Selected ETF Chips */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          flexWrap: 'wrap', 
          marginBottom: '1.5rem' 
        }}>
          {etfs.map((etf, index) => (
            <div
              key={etf.ticker_original}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'var(--bg-tertiary)',
                borderRadius: '20px',
                border: `2px solid ${colors[index]}`,
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: 600
              }}
            >
              <span>{etf.ticker_original}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                ({etf.metrics.avgCagr.toFixed(1)}%)
              </span>
              <button
                onClick={() => onRemove(etf.ticker_original)}
                style={{
                  background: colors[index],
                  border: 'none',
                  color: 'var(--bg-primary)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-secondary)"
              tick={{ fill: 'var(--text-secondary)' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getFullYear()}`;
              }}
            />
            <YAxis 
              stroke="var(--text-secondary)"
              tick={{ fill: 'var(--text-secondary)' }}
              label={{ 
                value: 'CAGR (%)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: 'var(--text-secondary)' }
              }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
              formatter={(value) => [`${value}%`, '']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend 
              wrapperStyle={{ color: 'var(--text-primary)' }}
            />
            <ReferenceLine y={0} stroke="var(--text-tertiary)" strokeDasharray="3 3" />
            {etfs.map((etf, index) => (
              <Line
                key={etf.ticker_original}
                type="monotone"
                dataKey={etf.ticker_original}
                stroke={colors[index]}
                strokeWidth={2.5}
                dot={false}
                name={`${etf.ticker_original} (${etf.metrics.avgCagr.toFixed(1)}%)`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
}

export default ChartDisplay;
