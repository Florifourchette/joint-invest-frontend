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
    text: "weekly",
    value: "2",
  },
  {
    key: "3",
    text: "monthly",
    value: "3",
  },
];

export default class DropdownExampleSelection extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <Dropdown
        defaultValue="1"
        fluid
        selection
        options={options}
        onChange={this.handleChange}
      />
    );
  }
}
