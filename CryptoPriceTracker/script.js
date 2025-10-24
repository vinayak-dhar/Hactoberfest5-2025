// Crypto Price Tracker using CoinGecko public API
// Endpoints used:
// - /coins/markets?vs_currency=usd&ids=... for price + market data
// - /coins/{id}/market_chart?vs_currency=usd&days=7 for 7 day hourly prices
// - /search/trending or /coins/markets?order=market_cap_desc&per_page=10 for lists

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const autoRefreshCheckbox = document.getElementById('autoRefresh');

const coinNameEl = document.getElementById('coinName');
const coinSymbolEl = document.getElementById('coinSymbol');
const coinImgEl = document.getElementById('coinImg');
const coinPriceEl = document.getElementById('coinPrice');
const coinChangeEl = document.getElementById('coinChange');
const coinMarketCapEl = document.getElementById('coinMarketCap');
const coinVolumeEl = document.getElementById('coinVolume');
const coinSupplyEl = document.getElementById('coinSupply');
const coinHighEl = document.getElementById('coinHigh');
const coinLowEl = document.getElementById('coinLow');

const trendingList = document.getElementById('trendingList');
const popularList = document.getElementById('popularList');
const priceChartCtx = document.getElementById('priceChart').getContext('2d');

let chartInstance = null;
let currentCoinId = null;
let refreshTimer = null;

searchBtn.addEventListener('click', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) return alert('Enter coin id or name (e.g. bitcoin)');
  fetchCoinByQuery(q);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});

autoRefreshCheckbox.addEventListener('change', () => {
  if (autoRefreshCheckbox.checked && currentCoinId) {
    startAutoRefresh();
  } else {
    stopAutoRefresh();
  }
});

// INITIAL: load popular coins
fetchPopularCoins();
fetchTrending();

// Fetch popular coins (top 8 by market cap)
async function fetchPopularCoins(){
  try {
    const res = await fetch(`${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false`);
    const data = await res.json();
    populateList(popularList, data);
  } catch(err) {
    console.error('popular fetch err', err);
  }
}

// Trending via search/trending
async function fetchTrending(){
  try {
    const res = await fetch(`${COINGECKO_BASE}/search/trending`);
    const json = await res.json();
    const items = json.coins.map(c => ({ id: c.item.id, name: c.item.name, symbol: c.item.symbol, thumb: c.item.thumb }));
    populateList(trendingList, items, true);
  } catch(err) {
    console.error('trending err', err);
  }
}

function populateList(container, items, simple=false){
  container.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px">
        <img src="${item.thumb || item.image || ''}" alt="${item.name}" style="width:28px;height:28px;border-radius:6px;object-fit:cover">
        <div>
          <div style="font-weight:600">${item.name}</div>
          <div style="font-size:12px;color:var(--muted)">${(item.symbol||'').toUpperCase()}</div>
        </div>
      </div>
      <div style="color:var(--muted);font-size:12px">View</div>
    `;
    li.onclick = () => { fetchCoinById(item.id || item); };
    container.appendChild(li);
  });
}

// Try fetching coin by name or id: use coins/list to convert name->id if needed
async function fetchCoinByQuery(q){
  // fast path: if query is a common id (no space), try direct id search
  if (!q.includes(' ') && !q.includes('_')) {
    fetchCoinById(q);
    return;
  }
  // else search list (fallback)
  try {
    const res = await fetch(`${COINGECKO_BASE}/coins/list`);
    const list = await res.json();
    const match = list.find(c => c.id === q || c.symbol === q || c.name.toLowerCase() === q);
    if (match) {
      fetchCoinById(match.id);
    } else {
      alert('Coin not found. Try coin id (e.g. bitcoin) or exact name.');
    }
  } catch (err) {
    console.error(err);
    alert('Search failed.');
  }
}

// Fetch coin by id and update UI
async function fetchCoinById(id){
  try {
    // main market data
    const marketRes = await fetch(`${COINGECKO_BASE}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(id)}&sparkline=false`);
    const marketData = await marketRes.json();
    if (!marketData || marketData.length === 0) {
      alert('Coin not found');
      return;
    }
    const coin = marketData[0];
    currentCoinId = coin.id;
    updateHeader(coin);

    // get 7-day chart (daily or hourly prices)
    const chartRes = await fetch(`${COINGECKO_BASE}/coins/${coin.id}/market_chart?vs_currency=usd&days=7&interval=hourly`);
    const chartJson = await chartRes.json();
    const prices = chartJson.prices || [];

    renderChart(prices);
    if (autoRefreshCheckbox.checked) startAutoRefresh();
  } catch (err) {
    console.error('fetchCoinById err', err);
    alert('Failed to fetch coin data.');
  }
}

function formatCurrency(n){
  if (n === null || n === undefined) return '—';
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
  return '$' + n.toLocaleString(undefined, {maximumFractionDigits:2});
}

function updateHeader(coin){
  coinImgEl.src = coin.image;
  coinNameEl.textContent = coin.name;
  coinSymbolEl.textContent = (coin.symbol || '').toUpperCase();
  coinPriceEl.textContent = formatCurrency(coin.current_price);
  coinMarketCapEl.textContent = formatCurrency(coin.market_cap);
  coinVolumeEl.textContent = formatCurrency(coin.total_volume);
  coinSupplyEl.textContent = coin.circulating_supply ? coin.circulating_supply.toLocaleString() : '—';
  coinHighEl.textContent = coin.high_24h ? formatCurrency(coin.high_24h) : '—';
  coinLowEl.textContent = coin.low_24h ? formatCurrency(coin.low_24h) : '—';

  const change = coin.price_change_percentage_24h;
  coinChangeEl.textContent = (change === null || change === undefined) ? '—' : `${change.toFixed(2)}%`;
  coinChangeEl.className = 'big ' + (change >= 0 ? 'positive' : 'negative');
}

function renderChart(prices){
  // prices: [[timestamp, price], ...]
  const labels = prices.map(p => {
    const d = new Date(p[0]);
    return `${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:00`;
  });
  const data = prices.map(p => p[1]);

  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.update();
    return;
  }

  chartInstance = new Chart(priceChartCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Price (USD)',
        data,
        borderColor: 'rgba(107,229,255,0.95)',
        backgroundColor: 'rgba(107,229,255,0.08)',
        pointRadius: 0,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: {
          ticks: { color: '#cfeef9' },
          grid: { color: 'rgba(255,255,255,0.03)' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `$${ctx.parsed.y.toFixed(2)}`
          }
        }
      }
    }
  });
}

function startAutoRefresh(){
  stopAutoRefresh();
  refreshTimer = setInterval(() => {
    if (currentCoinId) fetchCoinById(currentCoinId);
  }, 30000); // every 30s
}

function stopAutoRefresh(){
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
}
