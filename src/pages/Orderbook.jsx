import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Orderlist from "../components/orderlist";

export default function Orderbook() {
  const { contextStockData } = useAppContext();
  const [orders, setOrders] = useState();
  let { portfolio_id } = useParams();

  // console.log(logo);
  //console.log("context data", contextStockData);

  useEffect(() => {
    async function getOrders() {
      try {
        const stockInfos = await axios.get(
          `http://localhost:3000/api/order_book/${portfolio_id}`
        );
        console.log("Response data:", stockInfos.data);
        setOrders(stockInfos.data);
        // console.log(response.data);
        return stockInfos.data;
      } catch (err) {
        console.log(err);
      }
    }
    getOrders();
  }, []);

  return (
    <>
      <h1>Order Book</h1>
      <div>
        {orders &&
          orders.map((item, index, arr) => {
            return (
              <Orderlist
                item={item}
                index={index}
                arr={arr}
                contextStockData={contextStockData}
              />
            );
          })}
      </div>
    </>
  );
}
