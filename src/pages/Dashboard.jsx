import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../../utils/APIcalls';
import { useParams } from 'react-router-dom';
import OverviewChart from '../components/OverviewChart';
import PieChart from '../components/PieOverviewChart';
import {
  IoIosArrowDroprightCircle,
  IoIosContacts,
  IoIosAdd,
} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { createApiUrl } from '../../utils/CreateAPIUrl';
import useAuth from '../hooks/useAuth';
import LogIn from './LogIn';
import { Message } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import DeleteConfirmedButton from '../components/DeleteConfirmedButton';
import StatusMessages from '../components/StatusMessages';
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import AuthIssue from '../components/AuthIssue';

export default function Dashboard(props) {
  const [dashboardData, setDashboardData] = useState([]);
  const [wallet, setWallet] = useState([]);
  const [prices, setPrices] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [portfolioStatusUpdated, setPortfolioStatusUpdated] =
    useState(false);
  const [newData, setNewData] = useState([]);
  const { isAuthenticated } = useAuth();

  let { userId } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    getDashboardData(userId)
      .then((data) => {
        setDashboardData(
          data.portfolios.filter(
            (item) => item.portfolio_status !== 'deleted'
          )
        );

        setWallet(data.portfoliosDetails);
        setDataReady(true);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [userId, newData]);

  //API CALL
  useEffect(() => {
    if (loading === false && wallet.length > 0) {
      const companyIds = [
        ...new Set(wallet.map((item) => item.company_id)),
      ];

      const apiUrl = createApiUrl(companyIds);

      const apiCall = async () => {
        try {
          const data = await axios.post(
            'https://joint-invest-back-end.onrender.com/api/external',
            {
              cacheKey: 'currentPrices',
              remoteUrl: apiUrl,
            }
          );
          if (data.data?.status !== 'error') {
            setPrices(data.data);
          } else {
          }
        } catch (error) {}
      };
      apiCall();
    }
  }, [dashboardData, loading]);

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

  const totalAssetsSum = Object.values(totalAssets)
    .reduce((acc, curr) => {
      if (!Number.isNaN(curr)) {
        acc += curr;
      }
      return acc;
    }, 0)
    .toFixed(2);

  const totalAmountInvested = dashboardData
    .reduce(
      (accumulator, currentPortfolio) =>
        accumulator + currentPortfolio.invested_amount,
      0
    )
    .toFixed(2);

  const availableAmounts = dashboardData.map(
    (item) => item.available_amount
  );

  const totalAvailableAmount = availableAmounts.reduce(
    (acc, curr) => {
      const total = acc + curr;

      return total;
    },
    0
  );

  const totalPandL = (
    parseFloat(totalAssetsSum) - parseFloat(totalAmountInvested)
  ).toFixed(2);

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
            const price = Number.parseFloat(prices[company_id].price);
            const value = Number.parseFloat(number_of_shares) * price;
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

  const portfolioTotals = Object.entries(portfolioAssets).reduce(
    (acc, [portfolioId, assets]) => {
      const total = Object.values(assets)
        .reduce((sum, value) => sum + value, 0)
        .toFixed(2);
      acc[portfolioId] = total;
      return acc;
    },
    {}
  );

  return isAuthenticated ? (
    <div className="overview-page">
      <h1 className="overview-title">Overview</h1>

      <div className="assets">
        <h3>Total Assets</h3>
        <h2>
          ${' '}
          {(
            parseFloat(totalAssetsSum) +
            parseFloat(totalAvailableAmount)
          ).toFixed(2)}
        </h2>
        <h3>Amount Invested</h3>
        <h4>$ {totalAmountInvested}</h4>
        <h3>Total profit/loss</h3>
        <h4 className={totalPandL >= 0 ? 'positive' : 'negative'}>
          $ {totalPandL}
        </h4>
      </div>

      <div>
        {dataReady && Object.values(portfolioTotals)[0] > 0 ? (
          <PieChart
            dashboardData={dashboardData}
            portfolioTotals={portfolioTotals}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="portfolio-cards">
        {dashboardData.map((data) => (
          <>
            <div className="portfolio-card" key={data.portfolio_id}>
              <div className="portfolio-name-container">
                <h5 className="portfolio-name">
                  {data.name_of_portfolio}
                </h5>
              </div>
              <div className="portfolio-card-container">
                <div className="porfolio-card-values">
                  <div className="porfolio-card-value">
                    <h5 className="portfolio-value-title">
                      Current Value
                    </h5>
                    <h5>$ {portfolioTotals[data.portfolio_id]}</h5>
                  </div>
                  <div className="porfolio-card-value">
                    <h5 className="portfolio-value-title">
                      Profit/Loss
                    </h5>
                    <h5
                      className={
                        portfolioTotals[data.portfolio_id] -
                          data.invested_amount >=
                        0
                          ? 'positive'
                          : 'negative'
                      }
                    >
                      $
                      {(
                        portfolioTotals[data.portfolio_id] -
                        data.invested_amount
                      ).toFixed(2)}
                    </h5>
                  </div>

                  <div className="porfolio-card-value">
                    <img
                      src="/bee.png"
                      alt="friends"
                      style={{ width: '40px' }}
                    />
                    <h4 className="friend">{data.friend_username}</h4>
                  </div>
                </div>
                <DeleteConfirmedButton
                  data={data}
                  userId={userId}
                  portfolioTotals={portfolioTotals}
                  setPortfolioStatusUpdated={
                    setPortfolioStatusUpdated
                  }
                  portfolioStatusUpdated={portfolioStatusUpdated}
                  setNewData={setNewData}
                  wallet={wallet}
                  Navigate={Navigate}
                  prices={prices}
                  PortfolioProfitLoss={(
                    portfolioTotals[data.portfolio_id] -
                    data.total_buying_value
                  ).toFixed(2)}
                />
                {data.portfolio_status === 'pending_activation' ||
                data.portfolio_status === 'pending_deletion' ? (
                  <StatusMessages
                    data={data}
                    userId={userId}
                    portfolioTotals={portfolioTotals}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="portfolio-add">
        <p>Add a portfolio</p>
        <button
          className="hex-button space-under-add-button"
          style={{ padding: '10px 20px 10px 20px' }}
          onClick={() => Navigate(`/create_portfolio/${userId}`)}
        >
          <IoIosAdd
            className="portfolio-add-icon"
            style={{ fontSize: '3em' }}
          />
        </button>
      </div>
      <Navbar />
    </div>
  ) : (
    <AuthIssue />
  );
}
