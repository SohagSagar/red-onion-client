import { useState } from "react";
import { useEffect } from "react";

const useChartData = () => {
    const [chartData,setChartData]=useState({})
    const isEmpty=Object.keys(chartData).length === 0; 
   

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch(`https://red-onion-server.up.railway.app/order-count`);
            // convert the data to json
            const json = await data.json();

            // set state with the result
            
            setChartData(json)
        }
        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    if(!isEmpty){
        return chartData
    }
    else{
        return chartData
    }
   

}

export default useChartData;