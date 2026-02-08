/**
 * Calculate rolling returns for an ETF
 * @param {Array} prices - Array of price objects with {date, price}
 * @param {number} windowYears - Rolling window in years
 * @returns {Array} Rolling returns with {date, cagr}
 */
export function calculateRollingReturns(prices, windowYears) {
  if (!prices || prices.length === 0) return [];
  
  const windowMonths = windowYears * 12;
  const rollingReturns = [];

  for (let i = windowMonths; i < prices.length; i++) {
    const startPrice = prices[i - windowMonths].price;
    const endPrice = prices[i].price;
    
    if (startPrice && endPrice && startPrice > 0) {
      const cagr = (Math.pow(endPrice / startPrice, 1 / windowYears) - 1) * 100;
      
      rollingReturns.push({
        date: prices[i].date,
        cagr: cagr
      });
    }
  }

  return rollingReturns;
}

/**
 * Calculate metrics from rolling returns
 * @param {Array} rollingReturns - Array of rolling returns
 * @returns {Object} Metrics including avgCagr, volatility, sharpe, maxCagr, minCagr
 */
export function calculateMetrics(rollingReturns) {
  if (!rollingReturns || rollingReturns.length === 0) return null;

  const cagrs = rollingReturns.map(r => r.cagr);
  const avgCagr = cagrs.reduce((a, b) => a + b, 0) / cagrs.length;
  
  const variance = cagrs.reduce((sum, cagr) => sum + Math.pow(cagr - avgCagr, 2), 0) / cagrs.length;
  const volatility = Math.sqrt(variance);

  return {
    avgCagr: avgCagr,
    volatility: volatility,
    sharpe: volatility > 0 ? avgCagr / volatility : 0,
    maxCagr: Math.max(...cagrs),
    minCagr: Math.min(...cagrs)
  };
}

/**
 * Format number with specified decimal places
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined) return 'N/A';
  return num.toFixed(decimals);
}

/**
 * Format percentage
 * @param {number} num - Number to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export function formatPercent(num, decimals = 2) {
  if (num === null || num === undefined) return 'N/A';
  return `${num.toFixed(decimals)}%`;
}
