import { Triangle } from "react-loader-spinner";
import Header from "../components/Common/Header";
import Error from "../components/Common/Error";
import Search from "../components/Dashboard/Search";
import { useEffect, useState } from "react";
import PaginationComponent from "../components/Dashboard/Pagination";
import TabsComponent from "../components/Dashboard/TabsComponent";
import BackToTop from "../components/Common/BackToTop";
import get100CoinsData from "../functions/getAllCoins";

export default function DashboardPage() {
  console.log('dashboardpage Render');
  const [coinsData,setCoinsData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError]= useState()
  const [searchInput, setSearchInput] = useState("");
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [page, setPage] = useState(1);

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
          setCoinsData(myCoins.data);
          setPaginatedCoins(myCoins.data?.slice(0,10))
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

  const handlePageChange = (event, value) => {
    setPage(value);
    const previousIndex = (value - 1) * 10;
    setPaginatedCoins(coinsData.slice(previousIndex, previousIndex + 10));
  };
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
      {paginatedCoins != [] && !isLoading && !error && !searchInput && (
        <TabsComponent coinsData={paginatedCoins} />
      )}
      {!isLoading && !error && !searchInput && (
        <PaginationComponent page={page} onPageChange={handlePageChange} />
      )}
      <BackToTop />
    </div>
  );
}
