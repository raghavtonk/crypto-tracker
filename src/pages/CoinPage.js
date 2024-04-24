import { useParams } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import Error from "../components/Common/Error";
import { CreateCoinObject } from "../functions/CreateCoinsObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { useEffect, useState } from "react";
import LineChart from "../components/Coin/LineChart";
import SelectDays from "../components/Coin/SelectDays";
import PriceTypeToggle from "../components/Coin/PriceTypeToggle";
import { ChartJSDataset } from "../functions/ChartJSDataset";
import getOneCoinData from "../functions/getOneCoinDataset";
import getCoinDataBydays from "../functions/getCoinDataBydays";

export default function CoinPage() {
  console.log("coinpage Render");
  const [coinData, setCoinData] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [priceToggle, setPriceToggle] = useState("prices");
  const [chartDays, setChartDays] = useState(30);
  const { id } = useParams();

  useEffect(() => {
    const getChartData = async () => {
      setIsLoading(true);
      const myChart = await getCoinDataBydays(id,chartDays);
      if (myChart) {
        if (myChart.message === "success") {
          setChartsData(myChart.data);

          setIsLoading(false);
        } else if (myChart.message === "failed") {
          setError(myChart.data);
          setIsLoading(false);
        }
      }
    };
    getChartData()
  }, [chartDays,id]);
useEffect(()=>{
  const getCoinData = async () => {
    setIsLoading(true);
    const myCoin = await getOneCoinData(id);
    if (myCoin) {
      if (myCoin.message === "success") {
       myCoin.data.id && CreateCoinObject(setCoinData ,myCoin.data);

        setIsLoading(false);
      } else if (myCoin.message === "failed") {
        setError(myCoin.data);
        setIsLoading(false);
      }
    }
  };
  getCoinData()
},[id])
  let chartData = {};
  chartsData && (chartData = ChartJSDataset(chartsData, priceToggle));

  function handleDaysChange(event) {
    setChartDays(event.target.value);
  }

  const handlePriceTypeChange = (event, newtype) => {
    setPriceToggle(newtype);
  };
  return (
    <>
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
      {!isLoading && !error && coinData != [] && coinData !== undefined && (
        <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
          <List key={coinData.id} coin={coinData} />
        </div>
      )}
      {!isLoading && !error && chartData != {} && chartData !== undefined && (
        <div className="grey-wrapper">
          <SelectDays days={chartDays} onDaysChange={handleDaysChange} />
          <PriceTypeToggle
            priceToggle={priceToggle}
            handlePriceTypeChange={handlePriceTypeChange}
          />
          <LineChart chartData={chartData} priceToggle={priceToggle} multiAxis={false}/>
        </div>
      )}

      {!isLoading && !error && coinData != [] && coinData !== undefined && (
        <CoinInfo heading={coinData.name} desc={coinData.desc} />
      )}
    </>
  );
}
