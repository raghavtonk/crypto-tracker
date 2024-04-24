import React from 'react';

function isCoinInWatchlist(coinId) {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
  const isInWatchlist = watchlist.includes(coinId);
  
  return isInWatchlist;
}

export default isCoinInWatchlist;
