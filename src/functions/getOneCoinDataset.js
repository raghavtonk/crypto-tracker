import axios from "axios";

export default function getOneCoinData(id){
    console.log('getonecoinFuntion');
    const coinData = axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response)=>{
        return {data: response.data , message: 'success'}
    }).catch((error)=>{
        return{data: error.message || 'Something went wrong!' , message: 'failed'}
    });
    
    return coinData;
}