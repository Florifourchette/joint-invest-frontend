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
import useAuth from '../hooks/useAuth';
import { Message } from 'semantic-ui-react';
import { BiArrowBack } from 'react-icons/bi';
import LogIn from './LogIn';

export default function Messages() {
  const { userId } = useParams();
  const { isAuthenticated } = useAuth();
  const [portfoliosData, setPortfoliosData] = useState([]);
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
        console.log(data);
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
        console.log(portfoliosData);
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
        console.log(data);
        const portfolioTransactions = data.overview;
        console.log(portfolioTransactions);
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
    console.log(transaction);
    setTransactionDataCleaned(
      transaction?.map((item) => {
        console.log(item[0]);
        for (let j = 0; j < friends.length; j++) {
          if (
            item[0].user_id_status_request === friends[j].friend_id
          ) {
            return {
              type: 'transaction',
              requester_id: item[0].user_id_status_request,
              requester_name: friends[j].friend_username,
              date: item[0].request_creation_date,
              portfolio_name: item[0].name_of_portfolio,
              portfolio_id: item[0].portfolio_id,
              action: item[0].type_of_transaction,
              company_name: item[0].company_name,
              number_of_shares: item[0].number_of_shares,
              initial_amount: '',
            };
          } else if (item.user_id !== friends[j].friend_id) {
            return {
              type: 'transaction',
              requester_id: item[0].user_id,
              requester_name: 'You',
              date: item[0].creating_date,
              portfolio_name: item[0].name_of_portfolio,
              portfolio_id: item[0].portfolio_id,
              action: item[0].type_of_transaction,
              company_name: item[0].company_name,
              number_of_shares: item[0].number_of_shares,
              initial_amount: '',
            };
          }
        }
      })
    );
  };

  console.log(transactionsDataCleaned);

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

  console.log(allData);

  return isAuthenticated ? (
    <div className="message_page" style={{ width: '500px' }}>
      <h1>Messages</h1>
      {allData?.map((item, index) => {
        return (
          <div key={index} className="message_body">
            <div className="message_infos">
              <p>
                <IoIosContacts className="friend-icon" />
              </p>
              <p>{item.requester_name}</p>
              <p>{getShorterDate(item.date)}</p>
            </div>

            <div className="message_details">
              {item.type === 'portfolio' &&
              item.action === 'pending_activation' ? (
                <p>'Invitation'</p>
              ) : item.type === 'portfolio' &&
                item.action === 'pending_deletion' ? (
                <p>Deletion request</p>
              ) : (
                <p>item.portfolio_name</p>
              )}
              {item.type === 'portfolio' &&
              item.action === 'pending_activation'
                ? `to join ${item.portfolio_name}`
                : item.type === 'portfolio' &&
                  item.action === 'pending_deletion'
                ? `for ${item.portfolio_name}`
                : item.type === 'transaction' &&
                  item.action === 'Sell'
                ? `Selling request for ${item.company_name} ${item.number_of_shares} stock(s)`
                : `Buying request for ${item.company_name} ${item.number_of_shares} stock(s)`}
            </div>
            <div className="message_page_buttons">
              {item.type === 'transaction' ? (
                <p>
                  Check the transaction page of {item.portfolio_name}
                </p>
              ) : // <button
              //   onClick={() =>
              //     Navigate(`/transactions/${item.portfolio_id}`)
              //   }
              // >
              //   View
              // </button>
              item.requester_name === 'You' ? (
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
              ) : (
                <div>
                  Waiting for {item.requester_name}
                  <button
                    className="button_portfolio_status_change"
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
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <Navbar />
    </div>
  ) : (
    <div>
      <div className="d-flex justify-content-center">
        <Message style={{ color: 'red' }}>
          You are not logged in, please login!
        </Message>
      </div>
      <LogIn />
    </div>
  );
}
