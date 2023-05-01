import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

const options = [
  {
    key: "1",
    text: "daily",
    value: "1",
  },
  {
    key: "2",
    text: "since buy",
    value: "2",
  },
  {
    key: "3",
    text: "monthly",
    value: "3",
  },
];

export default class PortfolioDropdown extends Component {
  state = {};

  handleChange = (e, { value }) => {
    //console.log(value);
    const { text } = options.find((item) => item.value == value);
    this.setState({ value: value, text: text });
    this.props.setSelectedInterval(text);
  };

  render() {
    const { value } = this.state;
    //console.log(this.state);

    return (
      <Dropdown
        defaultValue="1"
        fluid
        selection
        options={options}
        onChange={this.handleChange}
        value={value}
      />
    );
  }
}
