import React, { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Orderlist from "../components/Orderlist";
import { BiArrowBack } from "react-icons/bi";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import AuthIssue from "../components/AuthIssue";

export default function Orderbook() {
  const { isAuthenticated } = useAuth();
  const { contextStockData } = useAppContext();
  const [orders, setOrders] = useState();
  let { portfolio_id } = useParams();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

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

  return isAuthenticated ? (
    <div className="bodyOrderbook">
      <div>
        <BiArrowBack className="orderBookBackButton" onClick={handleClick} />
      </div>
      <h1 className="orderBookTitle">Order Book</h1>
      <div style={{ marginBottom: "40px" }}>
        {orders &&
          orders.map((item, index, arr) => {
            return (
              <div className="OrderBookListItemContainer ">
                <Orderlist
                  item={item}
                  index={index}
                  arr={arr}
                  contextStockData={contextStockData}
                />
              </div>
            );
          })}
      </div>
      <Navbar />
    </div>
  ) : (
    <AuthIssue />
  );
}
