import React from "react";
import { Image, List } from "semantic-ui-react";

const StockListA = ({ url, symbol, id }) => (
  <>
    <List relaxed="very" key={id}>
      <List.Item>
        <Image avatar src={url} />
        <List.Content>
          <List.Header as="a">{symbol}</List.Header>
          <List.Description>VALUE</List.Description>
          <List.Description>CHANGE in $/CHANGE in %</List.Description>
        </List.Content>
      </List.Item>
    </List>
  </>
);

export default StockListA;
