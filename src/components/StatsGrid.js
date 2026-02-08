import React from 'react';
import { Database, TrendingUp, Award, Activity } from 'lucide-react';

function StatsGrid({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  const cagrs = data.map(etf => etf.metrics.avgCagr);
  const sharpes = data.map(etf => etf.metrics.sharpe);

  const sortedCagrs = [...cagrs].sort((a, b) => a - b);
  const medianCagr = sortedCagrs[Math.floor(sortedCagrs.length / 2)];
  const bestCagr = Math.max(...cagrs);
  const avgSharpe = sharpes.reduce((a, b) => a + b, 0) / sharpes.length;

  const stats = [
    {
      icon: Database,
      label: 'ETFs Disponibles',
      value: data.length,
      suffix: '',
      color: 'primary'
    },
    {
      icon: TrendingUp,
      label: 'CAGR Médian',
      value: medianCagr.toFixed(1),
      suffix: '%',
      color: 'positive'
    },
    {
      icon: Award,
      label: 'Meilleur Performer',
      value: bestCagr.toFixed(1),
      suffix: '%',
      color: 'positive'
    },
    {
      icon: Activity,
      label: 'Sharpe Moyen',
      value: avgSharpe.toFixed(2),
      suffix: '',
      color: 'primary'
    }
  ];

  return (
    <div className="stats-grid slide-in-right">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="stat-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <stat.icon size={24} style={{ 
            color: 'var(--accent-primary)', 
            margin: '0 auto 0.5rem',
            display: 'block'
          }} />
          <div className="stat-label">{stat.label}</div>
          <div className={`stat-value ${stat.color}`}>
            {stat.value}{stat.suffix}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsGrid;
