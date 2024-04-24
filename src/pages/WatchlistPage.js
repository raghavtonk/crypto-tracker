import { Triangle } from "react-loader-spinner";
import Header from "../components/Common/Header";
import Error from "../components/Common/Error";
import Search from "../components/Dashboard/Search";
import { useEffect, useState } from "react";
import TabsComponent from "../components/Dashboard/TabsComponent";
import BackToTop from "../components/Common/BackToTop";
import get100CoinsData from "../functions/getAllCoins";
import isCoinInWatchlist from "../functions/isCoinInWatchlist";

export default function WatchlistPage() {
  console.log('WatchList Render');
  const [coinsData,setCoinsData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError]= useState()
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }
  useEffect(()=>{
    const getData = async()=>{
      setIsLoading(true)
      const myCoins = await get100CoinsData();
      console.log(myCoins)
      if(myCoins){
        if(myCoins.message === 'success'){
        const watchCoins = myCoins.data.filter((coin)=> isCoinInWatchlist(coin.id))
        console.log(watchCoins)
          setCoinsData(watchCoins);
          setIsLoading(false)
        }
        else if(myCoins.message === 'failed'){
          setError(myCoins.data);
          setIsLoading(false);
        }
      }
    }
    getData();
  },[]);


  const filteredCoins = coinsData!=[] && coinsData?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchInput.toLowerCase())
  );

 console.log('coin',coinsData)
  return (
    <div>
      <Header />
      <Search inputValue={searchInput} onChange={handleSearchInput} />
      {isLoading && (
        <div className="loadind-State">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#3a80e9"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {!isLoading && error && (
        <Error title={"Faild to Fetch Coins Data"} message={error} />
      )}
      {filteredCoins && !isLoading && !error && searchInput && (
        <TabsComponent coinsData={filteredCoins} />
      )}
      {coinsData != [] && !isLoading && !error && !searchInput && (
        <TabsComponent coinsData={coinsData} />
      )}
      {coinsData.length === 0 && !isLoading && !error &&(
        <div className="noCoin-watchlist">
            <h1>No Coin is Add To Watchlist</h1>
        </div>
      )}
      <BackToTop />
    </div>
  );
}
