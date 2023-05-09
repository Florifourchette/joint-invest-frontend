import React, { useState, useEffect } from "react";
import { Image, List } from "semantic-ui-react";

const Orderlist = ({ item, index, arr, contextStockData }) => {
  //console.log(item);

  const { creating_date } = item;
  const date = creating_date.slice(2, 10).replace(/-/g, ".");
  const [year, month, day] = date.split(".");
  const newDateString = `${day}.${month}.${year}`;
  const dateGetMonth = creating_date.substring(0, 10);

  const prevItem = arr[index - 1];
  const prevMonth =
    prevItem && prevItem.creating_date.substring(0, 10).split("-")[1];

  //console.log(dateGetMonth);

  const insertLogo = (stockData, companyId) => {
    const theLogo = stockData.find((alogo) => alogo.companyid == companyId);
    console.log(theLogo);
    if (theLogo) {
      return `/company_logos/${theLogo.logo}`;
    }
    return "/company_logos/NO_LOGO.png";
  };
  // useEffect(() => {
  //   const theLogo = contextStockData.find(
  //     (alogo) => alogo.companyid == item.company_id
  //   );
  //   setLogo(theLogo.logo);
  //   console.log(theLogo.logo);
  // }, []);

  return (
    <>
      <div className="orderBookListItem">
        <List>
          {month !== prevMonth && (
            <List.Item>
              <List.Content>
                <h4 id="orderBookHeadline">
                  {new Date(creating_date).toLocaleString("default", {
                    month: "long",
                  })}
                </h4>
              </List.Content>
            </List.Item>
          )}
          <List.Item id="orderBookListEntry">
            <List.Content className="ui grid borderless">
              <div className="four wide column">
                <List.Header>{item.type_of_transaction}</List.Header>
                <List.Description>{newDateString}</List.Description>
              </div>
              <div className="three wide column">
                {contextStockData ? (
                  <div>
                    <Image
                      circular
                      style={{ borderRadius: "50%" }}
                      ui
                      size="mini"
                      src={insertLogo(contextStockData, item.company_id)}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="six wide column">
                <List.Description>{item.company_name}</List.Description>
                {item.number_of_shares < 1 ? (
                  <List.Description>{item.price_of_share}</List.Description>
                ) : (
                  <List.Description>
                    {item.price_of_share} x {item.number_of_shares}
                  </List.Description>
                )}
              </div>
              <div
                className="three wide column right aligned"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {item.type_of_transaction === "Buy" ? (
                  <List.Header
                    style={{
                      fontWeight: "600",
                      color: "green",
                      textAlign: "right",
                    }}
                  >
                    +
                    {parseFloat(
                      item.price_of_share * item.number_of_shares
                    ).toFixed(2)}
                  </List.Header>
                ) : (
                  <List.Header
                    style={{
                      fontWeight: "600",
                      color: "red",
                      textAlign: "right",
                    }}
                  >
                    -
                    {parseFloat(
                      item.price_of_share * item.number_of_shares
                    ).toFixed(2)}
                  </List.Header>
                )}
              </div>
            </List.Content>
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default Orderlist;
