import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../utils/APIcalls";
import { useParams } from "react-router-dom";

const fakeStocks = {
    AAPL: { price: "165.35000" },
    MSFT: { price: "281.85000" },
    TSLA: { price: "125.00000" },
    AMZN: { price: "100.1" },
};

// define a function to create the API URL with the given symbols
function createApiUrl(companyIds) {
    const apiKey = import.meta.env.VITE_API_KEY; // replace with your actual API key
    const tickerString = companyIds.join(",");
    return `https://api.twelvedata.com/price?symbol=${tickerString}&apikey=${apiKey}`;
}

function createFakeUrl(companyIds) {
    const tickerString = companyIds.join(",");
    return `https://fake.api.com/price?symbol=${tickerString}`;
}
function getFakeApiData() {
    return new Promise((resolve, reject) => {
        // Make a fake API call and return the fake data
        setTimeout(() => {
            resolve(fakeStocks);
        }, 1000); // You can adjust the delay time to simulate network latency
    });
}

export default function Dashboard(props) {
    const [dashboardData, setDashboardData] = useState([]);
    const [wallet, setWallet] = useState([]);
    const [prices, setPrices] = useState([]);

    let { userId } = useParams();

    useEffect(() => {
        getDashboardData(userId)
            .then((data) => {
                setDashboardData(data.portfolios);
                setWallet(data.portfoliosDetails);
            })
            .catch((error) => console.error(error));

        const companyIds = [...new Set(wallet.map((item) => item.company_id))];
        // const apiUrl = createApiUrl(companyIds);
        // console.log(apiUrl);

        // fetch(apiUrl)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         setPrices(data);
        //     })
        //     .catch((error) => console.error(error));

        const fakeApiUrl = createFakeUrl(companyIds);
        console.log(fakeApiUrl);
        getFakeApiData(fakeApiUrl)
            .then((data) => {
                console.log(data);
                setPrices(data);
            })
            .catch((error) => console.error(error));
    }, [userId]);

    console.log(dashboardData);
    console.log(wallet);
    console.log(prices);

    const totalAssets = wallet.reduce((acc, curr) => {
        const { company_id, number_of_shares } = curr;
        if (prices.hasOwnProperty(company_id)) {
            const price = Number.parseFloat(prices[company_id].price);
            const value = Number.parseFloat(number_of_shares) * price;
            acc[company_id] = value;
        }
        return acc;
    }, {});

    console.log(totalAssets);

    const totalAssetsSum = Object.values(totalAssets).reduce((acc, curr) => {
        if (!Number.isNaN(curr)) {
            acc += curr;
        }
        return acc;
    }, 0);

    const totalAmountInvested = dashboardData.reduce(
        (accumulator, currentPortfolio) =>
            accumulator + currentPortfolio.initial_amount,
        0
    );

    const totalPandL = totalAssetsSum - totalAmountInvested;

    if (dashboardData.length === 0) {
        // Render a loading message until the data is fetched - need to do this in order to wait for the fetched data to finish before rendering
        return <div>Loading...</div>;
    }

    return (
        <div className="overview-page">
            <h1>Overview</h1>
            <div className="assets">
                <h3>Total Assets</h3>
                <h2>${totalAssetsSum}</h2>
                <h5>Amount Invested</h5>
                <h4>$ {totalAmountInvested}</h4>
                <h5>Total gains</h5>
                <h4>{totalPandL}</h4>
            </div>
            <div className="graph">
                <h3>Graph goes here</h3>
            </div>
            <div className="portfolio-cards">
                {dashboardData.map((data) => (
                    <div className="portfolio-card" key={data.portfolio_id}>
                        <h4 className="portfolio-name">
                            {data.name_of_portfolio}
                        </h4>
                        <div className="porfolio-card-values">
                            <h5>
                                <span className="portfolio-value-title">
                                    Current Value:
                                </span>{" "}
                                {data.total_buying_value}
                            </h5>
                            <h5>
                                <span className="portfolio-value-title">
                                    Change:
                                </span>{" "}
                                {data.total_buying_value - 100}{" "}
                            </h5>{" "}
                            {/*change the 100 by the data from the api call*/}
                        </div>
                        <h4>{data.friend_username}</h4>
                    </div>
                ))}
            </div>

            <div className="portfolio-add">
                <p>Add a portfolio</p>
                <button>+</button>
            </div>
        </div>
    );
}
