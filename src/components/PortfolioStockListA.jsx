import React from "react";
import { Image, List } from "semantic-ui-react";

const StockListA = ({ item, externalAPIstocks }) => (
  <>
    <List relaxed="very">
      <List.Item className="d-flex">
        <Image
          avatar
          src="https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc"
        />
        <List.Content className="container d-flex w-100">
          <div className="d-flex justify-content-start flex-column">
            <List.Header as="a">{item.company_id}</List.Header>
            <List.Description style={{ fontWeight: "800", color: "grey" }}>
              {parseFloat(externalAPIstocks[item.company_id]?.close).toFixed(2)}
            </List.Description>
          </div>
          <div className="d-flex justify-content-end w-100 align-items-center">
            {parseFloat(externalAPIstocks[item.company_id]?.change) > 0 ? (
              <List.Description style={{ fontWeight: "600", color: "#7AD982" }}>
                +
                {parseFloat(externalAPIstocks[item.company_id]?.change).toFixed(
                  2
                )}
                % / +
                {(
                  parseFloat(externalAPIstocks[item.company_id]?.close) *
                  (parseFloat(externalAPIstocks[item.company_id]?.change) / 100)
                ).toFixed(2)}
                $
              </List.Description>
            ) : (
              <List.Description style={{ fontWeight: "600", color: "#DD7060" }}>
                {parseFloat(externalAPIstocks[item.company_id]?.change).toFixed(
                  2
                )}
                % /
                {(
                  parseFloat(externalAPIstocks[item.company_id]?.close) *
                  (parseFloat(externalAPIstocks[item.company_id]?.change) / 100)
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

export default StockListA;
