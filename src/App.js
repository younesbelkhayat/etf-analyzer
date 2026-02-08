import React, { useState, useMemo } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import ControlPanel from './components/ControlPanel';
import ModeTabs from './components/ModeTabs';
import ETFList from './components/ETFList';
import ChartDisplay from './components/ChartDisplay';
import StatsGrid from './components/StatsGrid';
import { calculateRollingReturns, calculateMetrics } from './utils/calculations';

function App() {
  const [etfData, setEtfData] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  
  const [selectedETF, setSelectedETF] = useState(null);
  const [compareETFs, setCompareETFs] = useState([]);
  const [mode, setMode] = useState('single');
  
  const [windowYears, setWindowYears] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('cagr-desc');

  // Process ETF data with rolling returns and metrics
  const processedData = useMemo(() => {
    if (!etfData) return [];
    
    return etfData.map(etf => {
      const rollingReturns = calculateRollingReturns(etf.prices, windowYears);
      const metrics = calculateMetrics(rollingReturns);
      
      return {
        ...etf,
        rollingReturns,
        metrics
      };
    }).filter(etf => etf.metrics !== null);
  }, [etfData, windowYears]);

  // Update selectedETF and compareETFs when windowYears changes to reflect new calculations
  React.useEffect(() => {
    if (selectedETF) {
      const updated = processedData.find(etf => etf.ticker_original === selectedETF.ticker_original);
      if (updated) {
        setSelectedETF(updated);
      }
    }
    if (compareETFs.length > 0) {
      const updatedCompare = compareETFs
        .map(etf => processedData.find(e => e.ticker_original === etf.ticker_original))
        .filter(Boolean);
      setCompareETFs(updatedCompare);
    }
  }, [processedData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...processedData];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(etf => {
        const name = (etf.nom || '').toLowerCase();
        const ticker = (etf.ticker_original || '').toLowerCase();
        const isin = (etf.isin || '').toLowerCase();
        return name.includes(query) || ticker.includes(query) || isin.includes(query);
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'cagr-desc':
          return b.metrics.avgCagr - a.metrics.avgCagr;
        case 'cagr-asc':
          return a.metrics.avgCagr - b.metrics.avgCagr;
        case 'sharpe-desc':
          return b.metrics.sharpe - a.metrics.sharpe;
        case 'volatility-asc':
          return a.metrics.volatility - b.metrics.volatility;
        case 'name-asc':
          return (a.nom || a.ticker_original || '').localeCompare(b.nom || b.ticker_original || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [processedData, searchQuery, sortBy]);

  const handleFileLoad = (data, name, size) => {
    setEtfData(data);
    setFileName(name);
    setFileSize(size);
    setSelectedETF(null);
    setCompareETFs([]);
  };

  const handleSelectETF = (etf) => {
    if (mode === 'single') {
      setSelectedETF(etf);
    } else {
      const isSelected = compareETFs.some(e => e.ticker_original === etf.ticker_original);
      if (isSelected) {
        setCompareETFs(compareETFs.filter(e => e.ticker_original !== etf.ticker_original));
      } else if (compareETFs.length < 4) {
        setCompareETFs([...compareETFs, etf]);
      }
    }
  };

  const isSelected = (etf) => {
    if (mode === 'single') {
      return selectedETF?.ticker_original === etf.ticker_original;
    }
    return compareETFs.some(e => e.ticker_original === etf.ticker_original);
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>⚡ ETF Analyzer Pro</h1>
          <p className="subtitle">
            Analyse multi-stratégie de performance glissante • Horizon 1-10 ans
          </p>
        </header>

        {/* File Upload */}
        <FileUpload 
          onFileLoad={handleFileLoad}
          fileName={fileName}
          fileSize={fileSize}
        />

        {etfData && (
          <>
            {/* Control Panel */}
            <ControlPanel
              windowYears={windowYears}
              onWindowYearsChange={setWindowYears}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Stats Grid */}
            <StatsGrid data={filteredData} />

            {/* Mode Tabs */}
            <ModeTabs mode={mode} onModeChange={setMode} />

            {/* Main Content */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: mode === 'single' ? '1fr 2fr' : '1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* ETF List */}
              <ETFList
                data={filteredData}
                onSelect={handleSelectETF}
                isSelected={isSelected}
                mode={mode}
              />

              {/* Chart Display */}
              {mode === 'single' && (
                <ChartDisplay
                  etf={selectedETF}
                  windowYears={windowYears}
                  mode="single"
                />
              )}
            </div>

            {/* Compare Mode Chart */}
            {mode === 'compare' && (
              <ChartDisplay
                etfs={compareETFs}
                windowYears={windowYears}
                mode="compare"
                onRemove={(ticker) => setCompareETFs(compareETFs.filter(e => e.ticker_original !== ticker))}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
