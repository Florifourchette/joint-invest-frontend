import React from "react";
import { Image, List } from "semantic-ui-react";

const Orderlist = ({ item, index, arr }) => {
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

  return (
    <>
      <List>
        {month !== prevMonth && (
          <List.Item>
            <List.Content>
              <h4>
                {new Date(creating_date).toLocaleString("default", {
                  month: "long",
                })}
              </h4>
            </List.Content>
          </List.Item>
        )}
        <List.Item className="">
          <List.Content className="ui grid">
            <div className="three wide column">
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
              className="four wide column right aligned"
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
                  +{item.price_of_share * item.number_of_shares}
                </List.Header>
              ) : (
                <List.Header
                  style={{
                    fontWeight: "600",
                    color: "red",
                    textAlign: "right",
                  }}
                >
                  -{item.price_of_share * item.number_of_shares}
                </List.Header>
              )}
            </div>
          </List.Content>
        </List.Item>
      </List>
    </>
  );
};

export default Orderlist;
