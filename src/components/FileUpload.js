import React, { useRef } from 'react';
import { Upload, FileJson, CheckCircle } from 'lucide-react';

function FileUpload({ onFileLoad, fileName, fileSize }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        
        // Validate JSON structure
        if (!Array.isArray(json)) {
          alert('❌ Le fichier JSON doit contenir un tableau');
          return;
        }

        if (json.length === 0) {
          alert('❌ Le fichier JSON est vide');
          return;
        }

        // Group by ticker to create ETF objects (skip invalid lines)
        const etfMap = new Map();
        let skippedLines = 0;

        json.forEach(item => {
          // Skip lines without required fields
          if (!item.ticker_original || !item.date || (item.adjclose === undefined && item.close === undefined)) {
            skippedLines++;
            return;
          }
          const ticker = item.ticker_original;
          
          if (!etfMap.has(ticker)) {
            etfMap.set(ticker, {
              nom: item.nom || null,
              ticker_original: ticker,
              ticker_yahoo: item.ticker_yahoo || ticker,
              isin: item.isin || null,
              source: item.source || null,
              suffix: item.suffix || null,
              currency: item.currency || null,
              exchange: item.exchange || null,
              prices: []
            });
          }

          // Add price point
          const price = item.adjclose !== undefined && item.adjclose !== null 
            ? item.adjclose 
            : item.close;

          if (price !== undefined && price !== null) {
            etfMap.get(ticker).prices.push({
              date: item.date,
              price: price,
              open: item.open,
              high: item.high,
              low: item.low,
              close: item.close,
              volume: item.volume
            });
          }
        });

        // Convert map to array and sort prices by date
        const processedData = Array.from(etfMap.values()).map(etf => ({
          ...etf,
          prices: etf.prices.sort((a, b) => new Date(a.date) - new Date(b.date))
        }));

        // Filter out ETFs with insufficient data
        const validData = processedData.filter(etf => etf.prices.length >= 12);

        if (validData.length === 0) {
          alert('❌ Aucun ETF avec suffisamment de données (minimum 12 mois)');
          return;
        }

        const sizeInKB = (file.size / 1024).toFixed(2);
        const etfCount = validData.length;
        const totalLines = json.length;
        
        // Show info about skipped lines if any
        let fileInfo = `${sizeInKB} KB • ${etfCount} ETF${etfCount > 1 ? 's' : ''}`;
        if (skippedLines > 0) {
          fileInfo += ` • ${skippedLines} ligne${skippedLines > 1 ? 's ignorée' : ' ignorée'}s`;
          console.log(`⚠️ ${skippedLines} lignes ignorées sur ${totalLines} (champs manquants: ticker_original, date, ou adjclose/close)`);
        }
        
        onFileLoad(validData, file.name, fileInfo);
      } catch (error) {
        alert('❌ Erreur lors de la lecture du fichier JSON: ' + error.message);
      }
    };

    reader.onerror = () => {
      alert('❌ Erreur lors de la lecture du fichier');
    };

    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-section fade-in">
      <div className="upload-content">
        {!fileName ? (
          <>
            <Upload className="upload-icon" />
            <div className="upload-text">
              <h3>Charger vos données ETF</h3>
              <p>Sélectionnez votre fichier JSON contenant l'historique des ETFs</p>
            </div>
            <div className="file-input-wrapper">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
              />
              <button className="btn-upload" onClick={handleButtonClick}>
                <FileJson size={20} />
                Parcourir les fichiers
              </button>
            </div>
          </>
        ) : (
          <div className="file-info">
            <CheckCircle className="file-info-icon" size={32} />
            <div className="file-info-text">
              <strong>✅ Fichier chargé avec succès</strong>
              <span>{fileName} • {fileSize}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
