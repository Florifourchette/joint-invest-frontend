import React, { useEffect, useState } from "react";
import { getTransactionsData } from "../../utils/APIcalls";
import { useParams } from "react-router-dom";

export default function Transactions() {
    let { portfolioId } = useParams();


    useEffect(() => {
        getTransactionsData(portfolioId)
        .then((data) => {
            console.log(data);

        })
        .catch((error) => console.error(error));
    }, [portfolioId])
    

  return (
    <div>
        <div className='transactions-title'>
            <h1>Buy/Sell</h1>
            <p>Once both partners have confirmed we will process your request</p>
        </div>
        <div className='SearchBar'>
            SearchBar goes here
        </div>
        <div className='your-stocks'>
            <h2>Your Stocks</h2>
            <div className='your-portfolio-stocks'>

            </div>
        </div>
        
    </div>
  )
}
