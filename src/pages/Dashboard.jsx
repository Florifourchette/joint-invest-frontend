import React, { useEffect, useState } from "react";
import { getDashboardData } from "../../utils/APIcalls";
import { useParams } from "react-router-dom";

// const fakeStocks = {
//     AAPL: { price: "165.35000" },
//     MSF: { price: "381.85000" },
//     TSLA: { price: "125.00000" },
//     AMZN: { price: "100.1" },
//     Test: { price: "100" },
//     Test2: { price: "20" },
// };

// define a function to create the API URL with the given symbols
function createApiUrl(companyIds) {
    const apiKey = import.meta.env.VITE_API_KEY; // replace with your actual API key
    const tickerString = companyIds.join(",");
    return `https://api.twelvedata.com/price?symbol=${tickerString}&apikey=${apiKey}`;
}

// function createFakeUrl(companyIds) {
//     const tickerString = companyIds.join(",");
//     return `https://fake.api.com/price?symbol=${tickerString}`;
// }
// function getFakeApiData() {
//     return new Promise((resolve, reject) => {
//         // Make a fake API call and return the fake data
//         setTimeout(() => {
//             resolve(fakeStocks);
//         }, 1000); // You can adjust the delay time to simulate network latency
//     });
// }

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
        console.log(`tickers: ${companyIds}`)
        const apiUrl = createApiUrl(companyIds);
        console.log(apiUrl);

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setPrices(data);
            })
            .catch((error) => console.error(error));

        // const fakeApiUrl = createFakeUrl(companyIds);
        // console.log(fakeApiUrl);
        // getFakeApiData(fakeApiUrl)
        //     .then((data) => {
        //         console.log(data);
        //         setPrices(data);
        //     })
        //     .catch((error) => console.error(error));
    }, [userId]);

    console.log(dashboardData);
    console.log(wallet);
    console.log(prices);


    //totalAssets top of overview
    const totalAssets = wallet.reduce((acc, curr) => {
        const { company_id, number_of_shares } = curr;
        if (prices.hasOwnProperty(company_id)) {
            const price = Number.parseFloat(prices[company_id].price);
            const value = Number.parseFloat(number_of_shares) * price;
            if (!acc.hasOwnProperty(company_id)) {
                acc[company_id] = value;
            } else {
                acc[company_id] += value;
            }
        }
        return acc;
    }, {});

    console.log(totalAssets);

    const totalAssetsSum = Object.values(totalAssets)
        .reduce((acc, curr) => {
            if (!Number.isNaN(curr)) {
                acc += curr;
            }
            return acc;
        }, 0)
        .toFixed(2);

    const totalAmountInvested = dashboardData.reduce(
        (accumulator, currentPortfolio) =>
            accumulator + currentPortfolio.initial_amount,
        0
    );

    const totalPandL = totalAssetsSum - totalAmountInvested;


    //portfolios current value
    const portfolioGroups = wallet.reduce((groups, item) => {
        const portfolioId = item.portfolio_id;
        if (!groups[portfolioId]) {
            groups[portfolioId] = [];
        }
        groups[portfolioId].push(item);
        return groups;
    }, {});

    const portfolioAssets = Object.keys(portfolioGroups).reduce(
        (acc, portfolioId) => {
            const portfolioItems = portfolioGroups[portfolioId];
            const portfolioTotalAssets = portfolioItems.reduce(
                (total, item) => {
                    const { company_id, number_of_shares } = item;
                    if (prices.hasOwnProperty(company_id)) {
                        const price = Number.parseFloat(
                            prices[company_id].price
                        );
                        const value =
                            Number.parseFloat(number_of_shares) * price;
                        if (!total.hasOwnProperty(company_id)) {
                            total[company_id] = value;
                        } else {
                            total[company_id] += value;
                        }
                    }
                    return total;
                },
                {}
            );
            acc[portfolioId] = portfolioTotalAssets;
            return acc;
        },
        {}
    );

    console.log(portfolioAssets);

    const portfolioTotals = Object.entries(portfolioAssets).reduce((acc, [portfolioId, assets]) => {
        const total = Object.values(assets).reduce((sum, value) => sum + value, 0).toFixed(2);
        acc[portfolioId] = total;
        return acc;
    }, {});
    console.log(portfolioTotals);


    return (
        <div className="overview-page">
            <h1>Overview</h1>

            <div className="assets">
                <h3>Total Assets</h3>
                <h2>$ {totalAssetsSum}</h2>
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
                            <div className="porfolio-card-value">
                                <h3 className="portfolio-value-title">
                                    Current Value:
                                </h3>
                                <h4>{portfolioTotals[data.portfolio_id]}</h4>
                            </div>
                            <div className="porfolio-card-value">
                                <h3 className="portfolio-value-title">
                                    Profit/Loss:
                                </h3>
                                <h4>{(portfolioTotals[data.portfolio_id]-data.total_buying_value).toFixed(2)}</h4>
                            </div>
                        </div>
                        <div className="friend-box">
                            <h4 className="friend">{data.friend_username}</h4>
                        </div>
                        
                    </div>
                ))}
            </div>

            <div className="portfolio-add">
                <p>Add a portfolio</p>
                <button className="portfolio-add-btn">+</button>
            </div>
        </div>
    );
}
