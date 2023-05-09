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
        const portfolioTransactions = data;

        return portfolioTransactions;
      })
      .then((data) => {
        transactionsAll.push(data);
        return cleanTransactionsData(transactionsAll);
      })
      .catch((error) => console.log(error.message));
  };

  const cleanDataPortfolio = (portfolio) => {
    setPortfolioDataCleaned(
      portfolio?.map((item) => {
        if (item.friend_id === item.user_id_request) {
          for (let j = 0; j < friends.length; j++) {
            if (item.user_id_request === friends[j].friend_id) {
              return {
                type: 'portfolio',
                requester_id: item.user_id_request,
                requester_name: friends[j].friend_username,
                date: item.request_creation_date,
                portfolio_name: item.name_of_portfolio,
                portfolio_id: item.portfolio_id,
                action: item.portfolio_status,
                company_name: '',
                number_of_shares: '',
                initial_amount: item.initial_amount,
              };
            }
          }
        } else {
          return {
            type: 'portfolio',
            requester_id: item.user_id_request,
            requester_name: 'you',
            date: item.request_creation_date,
            portfolio_name: item.name_of_portfolio,
            portfolio_id: item.portfolio_id,
            action: item.portfolio_status,
            company_name: '',
            number_of_shares: '',
            initial_amount: item.initial_amount,
          };
        }
      })
    );
  };

  const cleanTransactionsData = (transaction) => {
    setTransactionDataCleaned(
      transaction?.flatMap((items) => {
        return items?.map((item) => {
          if ((item.status = 'pending'))
            for (let j = 0; j < friends.length; j++) {
              for (let i = 0; i < portfoliosNames.length; i++) {
                if (
                  item.portfolio_id ===
                  portfoliosNames[i].portfolio_id
                ) {
                  if (item.user_id === friends[j].friend_id) {
                    return {
                      type: 'transaction',
                      requester_id: item.user_id,
                      requester_name: friends[j].friend_id,
                      date: item.creating_date,
                      portfolio_name:
                        portfoliosNames[i].portfolio_name,
                      portfolio_id: item.portfolio_id,
                      action: item.type_of_transaction,
                      company_name: item.company_name,
                      number_of_shares: item.number_of_shares,
                      initial_amount: '',
                      status: item.status,
                    };
                  } else if (item.user_id !== friends[j].friend_id) {
                    return {
                      type: 'transaction',
                      requester_id: item.user_id,
                      requester_name: 'you',
                      date: item.creating_date,
                      portfolio_name:
                        portfoliosNames[i].portfolio_name,
                      portfolio_id: item.portfolio_id,
                      action: item.type_of_transaction,
                      company_name: item.company_name,
                      number_of_shares: item.number_of_shares,
                      initial_amount: '',
                      status: item.status,
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

  // return isAuthenticated ?
  return (
    <>
      <div className="message_page">
        <h1>Messages</h1>
        {allData?.map((item, index) => {
          return (
            <div key={index} className="message-card">
              {/* Info part who created the request and when */}

              <div className="message-name-container">
                {item.type === 'portfolio' &&
                item.action === 'pending_activation' ? (
                  <h5>Invitation</h5>
                ) : item.type === 'portfolio' &&
                  item.action === 'pending_deletion' ? (
                  <h5>Deletion request</h5>
                ) : (
                  <h5>{item.portfolio_name}</h5>
                )}
              </div>
              <div className="message-card-container">
                <div className="message-card-values">
                  <div className="message-card-value-info">
                    <img
                      src="/bee.png"
                      alt="friends"
                      style={{ width: '40px' }}
                    />
                    <h4 className="friend">{item.requester_name}</h4>

                    <p>{getShorterDate(item.date)}</p>
                  </div>

                  <div className="message-card-value-mainDetails">
                    {/* If it concerns a portfolio then you can either activate or delete it */}

                    {item.type === 'portfolio' &&
                    item.action === 'pending_activation' ? (
                      <p>
                        to join {item.portfolio_name}. <br />{' '}
                        Requested by {item.requester_name}
                      </p>
                    ) : item.type === 'portfolio' &&
                      item.action === 'pending_deletion' ? (
                      <p>
                        for {item.portfolio_name}. Requested by{' '}
                        {item.requester_name}
                      </p>
                    ) : item.type === 'transaction' &&
                      item.action === 'Sell' ? (
                      <p>
                        {item.requester_name} would like to sell{' '}
                        {item.number_of_shares} stock(s) of{' '}
                        {item.company_name}.
                      </p>
                    ) : (
                      <p>
                        {item.requester_name} would like to buy{' '}
                        {item.number_of_shares} stock(s) of{' '}
                        {item.company_name}.
                      </p>
                    )}
                  </div>
                  <div className="message-card-value-status">
                    {item.type === 'transaction' ? (
                      <p>
                        Check the transactions page of{' '}
                        <span className="message_bold_span">
                          {item.portfolio_name}
                        </span>
                      </p>
                    ) : // <button
                    //   onClick={() =>
                    //     Navigate(`/transactions/${item.portfolio_id}`)
                    //   }
                    // >
                    //   View
                    // </button>
                    item.requester_name !== 'you' ? (
                      <div className="message_button_container">
                        <button
                          className="message_button"
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
                          className="message_button"
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
                      <div className="message_button_container message-card-value-status">
                        {item.requester_name !== 'you' ? (
                          <p>
                            Waiting for{' '}
                            <span className="message_bold_span">
                              {item.requester_name}
                            </span>
                          </p>
                        ) : (
                          <></>
                        )}
                        <button
                          className="message_button"
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
              </div>
            </div>
          );
        })}
      </div>
      <Navbar />
    </>
  );
  // : (
  //   <div>
  //     <div className="d-flex justify-content-center">
  //       <Message style={{ color: 'red' }}>
  //         You are not logged in, please login!
  //       </Message>
  //     </div>
  //     <LogIn />
  //   </div>
  // );
}
