import React, { useEffect, useState } from "react";
import { Image, List } from "semantic-ui-react";

const StockListB = ({ item, externalAPIstocks, stockData, sharePrice }) => {
  const [logo, setLogo] = useState();

  useEffect(() => {
    const theLogo = stockData.find(
      (alogo) => alogo.companyid == item.company_id
    );
    setLogo(theLogo.logo);
    console.log(theLogo.logo);
  }, []);

  return (
    <>
      <List relaxed="very">
        <List.Item className="d-flex">
          <Image
            avatar
            src={logo ? `/company_logos/${logo}` : `/company_logos/NO_LOGO.png`}
          />
          <List.Content className="container d-flex w-100">
            <div>
              <List.Header className="d-flex flex-row text-nowrap " as="a">
                {item.company_id} ({item.current_number_of_stocks})
              </List.Header>
              <List.Description style={{ fontWeight: "800", color: "grey" }}>
                {parseFloat(sharePrice[item.company_id]).toFixed(2)}
              </List.Description>
            </div>
            <div className="d-flex justify-content-end w-100 align-items-center">
              {parseFloat(sharePrice[item.company_id]) -
                item.average_price_buy >
              0 ? (
                <List.Description
                  style={{ fontWeight: "600", color: "#7AD982" }}
                >
                  +
                  {(
                    parseFloat(sharePrice[item.company_id]) /
                    item.average_price_buy
                  ).toFixed(2)}
                  % / +
                  {(
                    parseFloat(sharePrice[item.company_id]) *
                      parseInt(item.current_number_of_stocks) -
                    item.average_price_buy *
                      parseInt(item.current_number_of_stocks)
                  ).toFixed(2)}
                  $
                </List.Description>
              ) : (
                <List.Description
                  style={{ fontWeight: "600", color: "#DD7060" }}
                >
                  {(
                    parseFloat(sharePrice[item.company_id]) /
                      item.average_price_buy -
                    1
                  ).toFixed(2)}
                  % /
                  {(
                    parseFloat(sharePrice[item.company_id]) *
                      parseInt(item.current_number_of_stocks) -
                    item.average_price_buy *
                      parseInt(item.current_number_of_stocks)
                  ).toFixed(2)}
                  $
                </List.Description>
              )}
            </div>
          </List.Content>
        </List.Item>
      </List>
    </>
  );
};

export default StockListB;
