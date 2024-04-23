import axios from "axios";

export default function get100CoinsData(){
    console.log('get100Function render')
   const coinsData=  axios
    .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    ).then((response)=>{
        return {data: response.data , message: 'success'}
    }).catch((error)=>{
        return{data: error.message || 'Something went wrong!' , message: 'failed'}
    });
    
    return coinsData;
}