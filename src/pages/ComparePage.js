import { useCallback, useEffect, useState } from "react";
import SelectCoins from "../components/Common/Compare/SelectCoins";
import Header from "../components/Common/Header";
import SelectDays from "../components/Coin/SelectDays";
import { CreateCoinObject } from "../functions/CreateCoinsObject";
import getOneCoinData from "../functions/getOneCoinDataset";
import Error from "../components/Common/Error";
import { Triangle } from "react-loader-spinner";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import PriceTypeToggle from "../components/Coin/PriceTypeToggle";
import { ChartJSDataset } from "../functions/ChartJSDataset";
import getCoinDataBydays from "../functions/getCoinDataBydays";
import LineChart from "../components/Coin/LineChart";

export default function ComparePage() {
  console.log("comparepage Render");
  const [allCoinsData, setAllCoinData] = useState([]);
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [crypto1Data, setCrypto1Data] = useState([]);
  const [crypto2Data, setCrypto2Data] = useState([]);
  const [chartsData, setChartsData] = useState({ coin1: [], coin2: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [chartDays, setChartDays] = useState(30);
  const [priceToggle, setPriceToggle] = useState("prices");

  const handlePriceTypeChange = (event, newtype) => {
    setPriceToggle(newtype);
  };
  async function handleDaysChange(event) {
    setIsLoading(true);
    setChartDays(event.target.value);
    const price1 = await getCoinDataBydays(crypto1, event.target.value);
    const price2 = await getCoinDataBydays(crypto2, event.target.value);
    if (price1.message === "success" && price2.message === "success") {
      setChartsData({
        coin1: price1.data,
        coin2: price2.data,
      });
      setIsLoading(false);
    } else {
      setError(price1.data);
      setIsLoading(false);
    }
  }
  async function handleCoinChange(event, selected) {
    if (selected === "crypto1") {
      setIsLoading(true);
      setCrypto1(event.target.value);
      const myCoin1 = await getOneCoinData(event.target.value);
      if (myCoin1.message === "success") {
        myCoin1.data && CreateCoinObject(setCrypto1Data, myCoin1.data);
        const price1 = await getCoinDataBydays(event.target.value, chartDays);
        if (price1.message === "success") {
          setChartsData((preValue) => ({
            ...preValue,
            coin1: price1.data,
          }));
          setIsLoading(false);
        } else {
          setError(price1.data);
          setIsLoading(false);
        }
      } else {
        setError(myCoin1.data);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      setCrypto2(event.target.value);
      const myCoin2 = await getOneCoinData(event.target.value);
      if (myCoin2.message === "success") {
        myCoin2.data && CreateCoinObject(setCrypto2Data, myCoin2.data);
        const price2 = await getCoinDataBydays(event.target.value, chartDays);
        if (price2.message === "success") {
          setChartsData((preValue) => ({
            ...preValue,
            coin2: price2.data,
          }));
          setIsLoading(false);
        } else {
          setError(price2.data);
          setIsLoading(false);
        }
      } else {
        setError(myCoin2.data);
        setIsLoading(false);
      }
    }
  }

  const handleAllCoinDataChange = useCallback(function handleAllCoinDataChange(
    dataValue
  ) {
    setAllCoinData(dataValue);
  },
  []);
  console.log("chartdata....", chartsData);
  // useEffect(() => {
  //   getChartData();
  // }, []);
  // const getChartData = async () => {
  //   setIsLoading(true);
  //   const myChart1 = await getCoinDataBydays(crypto1, chartDays);
  //   const myChart2 = await getCoinDataBydays(crypto2, chartDays);
  //   if (myChart1 && myChart2) {
  //     if (myChart1.message === "success" && myChart2.message === "success") {
  //       myChart1.data &&
  //         myChart2.data &&
  //         setChartsData({
  //           coin1: myChart1.data,
  //           coin2: myChart2.data,
  //         });
  //       setIsLoading(false);
  //     } else if (
  //       myChart1.message === "failed" &&
  //       myChart2.message === "failed"
  //     ) {
  //       setError(myChart1.data);
  //       setIsLoading(false);
  //     }
  //   }
  // };
  useEffect(() => {
    getCoinData();
  }, []);
  const getCoinData = async () => {
    setIsLoading(true);
    const myCoin1 = await getOneCoinData(crypto1);

    if (myCoin1.message === "success") {
      const myCoin2 = await getOneCoinData(crypto2);
      myCoin1.data && CreateCoinObject(setCrypto1Data, myCoin1.data);
      if (myCoin2.message === "success") {
        myCoin2.data && CreateCoinObject(setCrypto2Data, myCoin2.data);
        const price1 = await getCoinDataBydays(crypto1, chartDays);
        const price2 = await getCoinDataBydays(crypto2, chartDays);
        if (price1.message === "success" && price2.message === "success") {
          setChartsData({
            coin1: price1.data,
            coin2: price2.data,
          });
          setIsLoading(false);
        } else {
          setError(price1.data);
          setIsLoading(false);
        }
      } else {
        setError(myCoin2.data);
        setIsLoading(false);
      }
    } else {
      setError(myCoin1.data);
      setIsLoading(false);
    }
  };

  let chartData = {};
  chartsData.coin1 &&
    chartsData.coin2 &&
    (chartData = ChartJSDataset(
      chartsData.coin1,
      priceToggle,
      chartsData.coin2
    ));
  return (
    <div>
      <Header />
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
      <div className="coins-days-flex">
        {!isLoading && !error && (
          <SelectCoins
            allCoinsData={allCoinsData}
            onAllCoinDataChange={handleAllCoinDataChange}
            crypto1={crypto1}
            crypto2={crypto2}
            handleCoinChange={handleCoinChange}
          />
        )}
        {!isLoading && !error && (
          <SelectDays
            days={chartDays}
            onDaysChange={handleDaysChange}
            onPTag={true}
          />
        )}
      </div>
      {!isLoading &&
        !error &&
        crypto1Data != [] &&
        crypto1Data !== undefined && (
          <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            <List coin={crypto1Data} />
          </div>
        )}
      {!isLoading &&
        !error &&
        crypto2Data != [] &&
        crypto2Data !== undefined && (
          <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            <List coin={crypto2Data} />
          </div>
        )}
      {!isLoading &&
        !error &&
        crypto2Data != [] &&
        crypto2Data !== undefined &&
        chartData != {} && (
          <div className="grey-wrapper">
            <PriceTypeToggle
              priceToggle={priceToggle}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart
              chartData={chartData}
              priceToggle={priceToggle}
              multiAxis={true}
            />
          </div>
        )}
      {!isLoading &&
        !error &&
        crypto1Data != [] &&
        crypto1Data !== undefined && (
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
        )}{" "}
      {!isLoading &&
        !error &&
        crypto2Data != [] &&
        crypto2Data !== undefined && (
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        )}
    </div>
  );
}
