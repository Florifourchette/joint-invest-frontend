
import React,{ useEffect, useState } from "react";
import { getDashboardData } from "../../utils/APIcalls";
import { useParams } from "react-router-dom";



const fakeStocks ={"AAPL":{"price":"165.35000"},"MSFT":{"price":"281.85000"}}


export default function Dashboard(props) {
    const [dashboardData, setDashboardData] = useState([])
    const [wallet, setWallet] = useState([])

    let { userId } = useParams();
        
    

    useEffect(()=>{
        
        getDashboardData(userId)
            .then(data => {
                setDashboardData(data.portfolios)
                setWallet(data.portfoliosDetails)
            
            })
            .catch(error => console.error(error))
            
    }, [])
    console.log(dashboardData)
    console.log(wallet)



    if (dashboardData.length === 0) {
        // Render a loading message until the data is fetched - need to do this in order to wait for the fetched data to finish before rendering
        return <div>Loading...</div>;
    
    }



    return (
        <div className="overview-page">
            <h1>Overview</h1>
            <div className="assets">
                <h3>Total Assets</h3>
                <h2>1.1345.77</h2>
                <h5>Amount Invested</h5>
                <h4>$ {dashboardData.reduce((accumulator, currentPortfolio) => accumulator + currentPortfolio.initial_amount, 0)}</h4>
                <h5>Total gains</h5>
                <h4>+135.22</h4>
            </div>
            <div className="graph">
                <h3>Graph goes here</h3>
            </div>


            <div className="portfolio-cards">
            {dashboardData.map((data) => (
                <div className="portfolio-card" key={data.portfolio_id}>
                    <h4 className="portfolio-name">{data.name_of_portfolio}</h4>
                    <div className="porfolio-card-values">
                        
                        <h5><span className="portfolio-value-title">Current Value:</span> {data.total_buying_value}</h5>
                        <h5><span className="portfolio-value-title">Change:</span>  {data.total_buying_value -100} </h5> {/*change the 100 by the data from the api call*/}
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
