import { useCallback, useEffect, useState } from "react";

export default function useGet100CoinsApi(initialState,url,setPaginatedCoins = false){
  console.log('get100coin Render');

    const [data,setData] = useState(initialState);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();
    const sendRequest= useCallback(
        async function sendRequest(){
            setIsLoading(true);
            try{
                const response = await fetch(url);
                const resData = await response.json()
                
                if(!response.ok){
                    throw new Error( resData.message || 'Something went wrong, faild to send request.')
                }
                
                setData(resData);
                setPaginatedCoins(resData.slice(0,10));
            }catch(error){
                setError(error.message || 'Something went wrong!')
            }
            setIsLoading(false);
        },[url,setPaginatedCoins])
        useEffect(()=>{
                sendRequest()
        },[sendRequest]);
        

    return{
        data,
        isLoading,
        error,
    }
}