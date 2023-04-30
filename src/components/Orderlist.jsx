import React from "react";
import { Image, List } from "semantic-ui-react";

const Orderlist = ({ item }) => {
  console.log(item);

  const { creating_date } = item;
  const date = creating_date.slice(2, 10).replace(/-/g, ".");
  const [year, month, day] = date.split(".");
  const newDateString = `${day}.${month}.${year}`;
  console.log(date);

  return (
    <List>
      <List.Item className="">
        <List.Content className="ui grid">
          <div className="four wide column">
            <List.Header>{item.type_of_transaction}</List.Header>
            <List.Description>{newDateString}</List.Description>
          </div>
          <div
            className="three wide column"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <Image
                circular
                style={{ borderRadius: "50%" }}
                ui
                size="mini"
                src="../src/assets/company_logos/AAPL.png"
              />
            </div>
          </div>
          <div className="five wide column">
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
            className="four wide column right aligned align-items-center"
            style={{ display: "flex", alignItems: "center" }}
          >
            {item.type_of_transaction === "Buy" ? (
              <List.Header style={{ fontWeight: "600", color: "green" }}>
                +{item.price_of_share * item.number_of_shares}
              </List.Header>
            ) : (
              <List.Header style={{ fontWeight: "600", color: "red" }}>
                -{item.price_of_share * item.number_of_shares}
              </List.Header>
            )}
          </div>
        </List.Content>
      </List.Item>
    </List>
  );
};

export default Orderlist;
