import React, { useState, useEffect } from "react";
import { Dropdown, Loader } from "semantic-ui-react";

export default function StockSearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOptions, setSearchOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchSearchOptions() {
            setIsLoading(true);

            const response = await fetch(`/api/search?q=${searchQuery}`);
            const data = await response.json();

            setSearchOptions(data);
            setIsLoading(false);
        }

        if (searchQuery) {
            fetchSearchOptions();
        } else {
            setSearchOptions([]);
        }
    }, [searchQuery]);

    return (
        <div className="ui search">
            <div className="ui icon input">
                <input
                    className="prompt"
                    type="text"
                    placeholder="Find new stocks"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <i className="search icon"></i>
            </div>
            {isLoading && <Loader active inline />}
            {!isLoading && searchOptions.length > 0 && (
                <Dropdown
                    className="results"
                    fluid
                    selection
                    options={searchOptions}
                />
            )}
        </div>
    );
}
