import { useCallback, useEffect, useState } from "react";

export default function useGetOneCoinData(initialState,url,CreateCoinObject=false){
  console.log('get1coin Render');
    
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
                CreateCoinObject !== false && CreateCoinObject(setData,resData);
                (!CreateCoinObject || CreateCoinObject === false) && setData(resData);
            }catch(error){
                setError(error.message || 'Something went wrong!')
            }
            setIsLoading(false);
        },[url,CreateCoinObject])
        useEffect(()=>{
                sendRequest()
        },[sendRequest]);
        

    return{
        data,
        isLoading,
        error,
        
    }
}