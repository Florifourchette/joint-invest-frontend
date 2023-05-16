import React, { useState, useEffect } from 'react';
import { Dropdown, Loader } from 'semantic-ui-react';

export default function StockSearchBar({
  selectedOption,
  setSelectedOption,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSearchOptions() {
      setIsLoading(true);

      const response = await fetch(
        `https://api.twelvedata.com/symbol_search?symbol=${searchQuery}&show_plan=true`
      );
      const responseData = await response.json();
      const data = responseData.data;

      // filtering out results not included in the plan
      const filteredData = data.filter((stock) => {
        return stock.access.plan === 'Basic';
      });

      const options = filteredData.map((stock, index) => ({
        key: index,
        text: `${stock.instrument_name} (${stock.symbol})`,
        value: stock.symbol,
      }));

      setSearchOptions(options);
      setIsLoading(false);
    }
    if (searchQuery === '') {
      setSearchOptions([]);
    }
    if (searchQuery.length > 1) {
      fetchSearchOptions();
    }
  }, [searchQuery]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  function handleClear() {
    setSelectedOption('');
  }

  return (
    <div className="ui search transaction-search">
      <div className="ui icon input ">
        <input
          className="prompt"
          type="text"
          placeholder={
            selectedOption === '' ? 'Find new stocks' : selectedOption
          }
          value={selectedOption === '' ? searchQuery : selectedOption}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        {selectedOption !== '' && (
          <button style={{ background: '#FFF3BE' }}>
            <i
              className="close icon"
              onClick={handleClear}
              style={{ fontSize: '1.2em' }}
            ></i>
          </button>
        )}
        {selectedOption === '' && <i className="search icon"></i>}
      </div>
      {isLoading && <Loader active inline />}
      {!isLoading &&
        searchOptions.length > 0 &&
        selectedOption === '' && (
          <Dropdown.Menu className="drop-down">
            {searchOptions.map((option, index) => (
              <Dropdown.Item
                key={index}
                text={option.text}
                value={option.value}
                onClick={() => handleSelect(option.text)}
                className="dropdown-item"
              />
            ))}
          </Dropdown.Menu>
        )}
      {!isLoading && searchOptions.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  );
}
