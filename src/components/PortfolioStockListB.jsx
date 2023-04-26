import React from "react";
import { Image, List } from "semantic-ui-react";

const StockListB = ({ item, externalAPIstocks }) => (
  <>
    <List relaxed="very">
      <List.Item className="d-flex">
        <Image
          avatar
          src="https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc"
        />
        <List.Content className="container d-flex w-100">
          <div>
            <List.Header className="d-flex flex-row text-nowrap " as="a">
              {item.company_id} ({item.current_number_of_stocks})
            </List.Header>
            <List.Description style={{ fontWeight: "800", color: "grey" }}>
              {parseFloat(externalAPIstocks[item.company_id]?.close).toFixed(2)}
            </List.Description>
          </div>
          <div className="d-flex justify-content-end w-100 align-items-center">
            {parseFloat(externalAPIstocks[item.company_id]?.close) -
              item.average_price_buy >
            0 ? (
              <List.Description style={{ fontWeight: "600", color: "#7AD982" }}>
                +
                {(
                  parseFloat(externalAPIstocks[item.company_id]?.close) /
                  item.average_price_buy
                ).toFixed(2)}
                % / +
                {(
                  parseFloat(externalAPIstocks[item.company_id]?.close) *
                    parseInt(item.current_number_of_stocks) -
                  item.average_price_buy *
                    parseInt(item.current_number_of_stocks)
                ).toFixed(2)}
                $
              </List.Description>
            ) : (
              <List.Description style={{ fontWeight: "600", color: "#DD7060" }}>
                {(
                  parseFloat(externalAPIstocks[item.company_id]?.close) /
                    item.average_price_buy -
                  1
                ).toFixed(2)}
                % /
                {(
                  parseFloat(externalAPIstocks[item.company_id]?.close) *
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

export default StockListB;
