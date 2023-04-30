import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LogIn from "./LogIn";
import { Message } from "semantic-ui-react";
import axios from "axios";
import Orderlist from "../components/orderlist";

export default function Orderbook() {
  const [orders, setOrders] = useState();
  let { portfolio_id } = useParams();

  console.log(orders);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order_book/${portfolio_id}`
        );
        setOrders(response.data);
        console.log(response.data);
        return response.data;
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
            return <Orderlist item={item} index={index} arr={arr} />;
          })}
      </div>
    </>
  );
}
