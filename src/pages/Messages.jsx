import Navbar from '../components/Navbar';
import {
  getDashboardData,
  getTransactionsData,
} from '../../utils/APIcalls';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IoIosContacts } from 'react-icons/io';
import { parseISO } from 'date-fns';
import { setPortfolioStatus } from '../../utils/PortfolioDeletion';
import { useNavigate } from 'react-router-dom';

export default function Messages() {
  const { userId } = useParams();
  const Navigate = useNavigate();
  const [portfoliosData, setPortfoliosData] = useState([]);
  const [
    transactionsPendingRequests,
    setTransactionsPendingRequests,
  ] = useState([]);
  const [portfolioIds, setPortfolioIds] = useState([]);
  const [friends, setFriends] = useState([]);
  const [portfoliosNames, setPortfoliosNames] = useState([]);
  const [transactionsDataCleaned, setTransactionDataCleaned] =
    useState([]);
  const [portfolioDataCleaned, setPortfolioDataCleaned] = useState(
    []
  );
  const [newData, setNewData] = useState([]);

  const transactionsAll = [];

  useEffect(() => {
    getDashboardData(userId)
      .then((data) => {
        setFriends(
          data.portfolios.map((item) => {
            return {
              friend_id: item.friend_id,
              friend_username: item.friend_username,
            };
          })
        );

        setPortfoliosNames(
          data.portfolios.map((item) => {
            return {
              portfolio_id: item.portfolio_id,
              portfolio_name: item.name_of_portfolio,
            };
          })
        );

        const portfolioInfos = data.portfolios.filter(
          (item) =>
            item.portfolio_status !== 'deleted' &&
            item.portfolio_status !== 'activated'
        );
        setPortfoliosData(portfolioInfos);
        return data;
      })
      .then((data) => {
        setPortfolioIds(
          data.portfolios.map((item) => item.portfolio_id)
        );
      })
      .then((data) => {
        console.log(portfolioIds);
        portfolioIds.forEach((id) => getTransactions(id));
      })
      .then((data) => {
        cleanDataPortfolio(portfoliosData);
      })
      .catch((error) => console.error(error));
  }, [newData]);

  useEffect(() => {
    portfolioIds.forEach((id) => getTransactions(id));
    cleanDataPortfolio(portfoliosData);
  }, [portfolioIds, newData]);

  const getTransactions = (id) => {
    getTransactionsData(id)
      .then((data) => {
        const portfolioTransactions = data.filter(
          (transaction) => transaction.status === 'pending'
        );
        return portfolioTransactions;
      })
      .then((data) => {
        console.log(data);
        transactionsAll.push(data);
        return cleanTransactionsData(transactionsAll);
      })
      .catch((error) => error.message);
  };

  const cleanDataPortfolio = (portfolio) => {
    setPortfolioDataCleaned(
      portfolio?.map((item) => {
        return {
          type: 'portfolio',
          requester_id: item.user_id_request,
          requester_name: item.friend_username,
          date: item.request_creation_date,
          portfolio_name: item.name_of_portfolio,
          portfolio_id: item.portfolio_id,
          action: item.portfolio_status,
          company_name: '',
          number_of_shares: '',
          initial_amount: item.initial_amount,
        };
      })
    );
  };

  const cleanTransactionsData = (transaction) => {
    setTransactionDataCleaned(
      transaction?.flatMap((items) => {
        return items?.map((item) => {
          for (let j = 0; j < friends.length; j++) {
            for (let i = 0; i < portfoliosNames.length; i++) {
              if (
                item.portfolio_id === portfoliosNames[i].portfolio_id
              ) {
                if (item.user_id === friends[j].friend_id) {
                  return {
                    type: 'transaction',
                    requester_id: item.user_id,
                    requester_name: friends[j].friend_id,
                    date: item.creating_date,
                    portfolio_name: portfoliosNames[i].portfolio_name,
                    portfolio_id: item.portfolio_id,
                    action: item.type_of_transaction,
                    company_name: item.company_name,
                    number_of_shares: item.number_of_shares,
                    initial_amount: '',
                  };
                } else if (item.user_id !== friends[j].friend_id) {
                  return {
                    type: 'transaction',
                    requester_id: item.user_id,
                    requester_name: 'You',
                    date: item.creating_date,
                    portfolio_name: portfoliosNames[i].portfolio_name,
                    portfolio_id: item.portfolio_id,
                    action: item.type_of_transaction,
                    company_name: item.company_name,
                    number_of_shares: item.number_of_shares,
                    initial_amount: '',
                  };
                }
              }
            }
          }
        });
      })
    );
  };

  const getShorterDate = (date) => {
    const index = date.indexOf('T');
    return date.slice(0, index);
  };

  const allData = portfolioDataCleaned
    .concat(transactionsDataCleaned)
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

  return (
    <div>
      <h1>Messages</h1>
      {allData?.map((item, index) => {
        return (
          <div key={index}>
            <IoIosContacts className="friend-icon" />
            <p>{item.requester_name}</p>
            <p>{getShorterDate(item.date)}</p>
            <p>
              {item.type === 'portfolio' &&
              item.action === 'pending_activation'
                ? 'Invitation'
                : item.type === 'portfolio' &&
                  item.action === 'pending_deletion'
                ? 'Deletion request'
                : item.portfolio_name}
            </p>
            <p>
              {item.type === 'portfolio' &&
              item.action === 'pending_activation'
                ? `to join ${item.portfolio_name}`
                : item.type === 'portfolio' &&
                  item.action === 'pending_deletion'
                ? `to delete ${item.portfolio_name}`
                : item.type === 'transaction' &&
                  item.action === 'Sell'
                ? `Selling request for ${item.company_name} ${item.number_of_shares} stock(s)`
                : `Buying request for ${item.company_name} ${item.number_of_shares} stock(s)`}
            </p>
            {item.type === 'transaction' ? (
              <button
                onClick={() =>
                  Navigate(`/transactions/${item.portfolio_id}`)
                }
              >
                View
              </button>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setPortfolioStatus(
                      item.portfolio_id,
                      userId,
                      item.action,
                      'confirmed',
                      setNewData
                    );
                  }}
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setPortfolioStatus(
                      item.portfolio_id,
                      userId,
                      item.action,
                      'rejected',
                      setNewData
                    );
                  }}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* <Navbar /> */}
    </div>
  );
}
