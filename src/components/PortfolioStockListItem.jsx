import React from "react";
import { Image, List } from "semantic-ui-react";

const StockListItem = ({ url, symbol, id }) => (
  <>
    <List relaxed="very" key={id}>
      <List.Item>
        <Image avatar src={url} />
        <List.Content>
          <List.Header as="a">{symbol}</List.Header>
          <List.Description>
            Last seen watching{" "}
            <a>
              <b>Arrested Development</b>
            </a>{" "}
            just now.
          </List.Description>
        </List.Content>
      </List.Item>
    </List>
  </>
);

export default StockListItem;
