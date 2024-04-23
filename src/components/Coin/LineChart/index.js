import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";
import { convertNumbers } from "../../../functions/convertNumbers";

export default function LineChart({chartData,priceToggle,multiAxis}){
    const options={
        plugins:{
            legend:{
                display: multiAxis ? true: false,
            },
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        }, 
        scales:{
            crypto1:{
                type:'linear',
                display: true,
                position: 'left',
                ticks:{
                    callback:function(value,index,ticks){
                        if(priceToggle === 'prices')
                        return '$' + value?.toLocaleString();
                    else
                    return '$' + convertNumbers(value);
                    }
                }
            },
            crypto2:{
                type:'linear',
                display: true,
                position: 'right',
                ticks:{
                    callback:function(value,index,ticks){
                        if(priceToggle === 'prices')
                        return '$' + value?.toLocaleString();
                    else
                    return '$' + convertNumbers(value);
                    }
                }
            },
        }
    };
    return(
        <Line data={chartData} options={options} /> 
    )
}