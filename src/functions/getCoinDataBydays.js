import axios from "axios";

export default function getCoinDataBydays(id, chartDays) {
  console.log("getonecoinbyDaysFuntion");
  const coinData = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=USD&days=${chartDays}&interval=daily`,
      { crossDomain: true }
    )
    .then((response) => {
      return { data: response.data, message: "success" };
    })
    .catch((error) => {
      return {
        data: error.message || "Something went wrong!",
        message: "failed",
      };
    });

  return coinData;
}
