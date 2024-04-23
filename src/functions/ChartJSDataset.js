import { ConvertDate } from "./ConvertData";

export function ChartJSDataset( price1, priceToggle, price2 ,) {
  if (price2) {
    return{
      labels: price1[priceToggle]?.map((element) =>
        ConvertDate(element[0])
      ),
      datasets: [
        {
          label: 'crypto 1',
          data: price1[priceToggle]?.map((element) => element[1]),
          borderColor: "#3a80e9",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          pointRadius: 0,
          yAxisID: 'crypto1',
        },
        {
          label: 'crypto 2',
          data: price2[priceToggle]?.map((element) => element[1]),
          borderColor: "#61c96f",
          borderWidth: 2,
          fill: false,
          tension: 0.25,
          pointRadius: 0,
          yAxisID: 'crypto2',
        },
      ],
    };
  } else {
    return{
      labels: price1[priceToggle]?.map((element) =>
        ConvertDate(element[0])
      ),
      datasets: [
        {
          data: price1[priceToggle]?.map((element) => element[1]),
          borderColor: "#3a80e9",
          backgroundColor: "rgba(58,128,233,0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.25,
          pointRadius: 0,
          yAxisID: 'crypto1',
        },
      ],
    };
  }
}
