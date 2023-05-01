import React from "react";

export default function StockSearchBar() {
    return (
        <div class="ui search">
            <div class="ui icon input">
                <input
                    class="prompt"
                    type="text"
                    placeholder="Find new stocks"
                ></input>
                <i class="search icon"></i>
            </div>
            <div class="results"></div>
        </div>
    );
}
