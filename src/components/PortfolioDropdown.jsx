import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
  {
    key: '1',
    text: 'Hourly',
    value: '1',
  },
  {
    key: '2',
    text: 'Overall',
    value: '2',
  },
];

export default class PortfolioDropdown extends Component {
  state = {};

  handleChange = (e, { value }) => {
    const { text } = options.find((item) => item.value == value);
    this.setState({ value: value, text: text });
    this.props.setSelectedInterval(text);
  };

  render() {
    const { value } = this.state;

    return (
      <Dropdown
        defaultValue="1"
        fluid
        selection
        options={options}
        onChange={this.handleChange}
        value={value}
        style={{
          backgroundColor: '#FFF3BE',
          border: '1px solid #5A3A31',
          boxShadow: '0 1px 1px hsl(0deg 0% 0% / 0.3)',
        }}
      />
    );
  }
}
