import { toast } from "react-toastify";

export function AddToWatchList(id){
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const index = watchlist.indexOf(id);
    if (index !== -1) {
        if (window.confirm('This item is already in your watchlist. Do you want to remove it?')) {
          watchlist.splice(index, 1);
          localStorage.setItem('watchlist', JSON.stringify(watchlist));
          toast.success(id +' removed from watchlist.');
        }
      } else {
        watchlist.push(id);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        toast.success( id + ' added to watchlist.');
      }
}