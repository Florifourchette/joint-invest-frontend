import React, { Children } from 'react';
import {
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';
import {
  getDashboardData,
  getTransactionsData,
} from '../../utils/APIcalls';
import useAuth from '../hooks/useAuth';

export const MessageContextObj = createContext();

export const useMessageContext = () => useContext(MessageContextObj);

const MessageContextWrapper = ({ children }) => {
  const userDetails = useAuth();
  const userId = userDetails.userLogin.id;
  const [portfoliosData, setPortfoliosData] = useState(0);
  const [transactionsData, setTransactionsData] = useState([]);
  const [portfolioIds, setPortfolioIds] = useState([]);
  const [allData, setAllData] = useState([]);
  const transactionsAll = [];

  useEffect(() => {
    getDashboardData(userId)
      .then((data) => {
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
        return portfolioIds;
      })
      .then((data) => {
        portfolioIds.forEach((id) => getTransactions(id));
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log('useffect started');
    console.log(portfolioIds);
    portfolioIds.forEach((id) => {
      return getTransactions(id);
    });
  }, [portfolioIds]);

  const getTransactions = (id) => {
    console.log(id);
    getTransactionsData(id)
      .then((data) => {
        console.log(
          data.filter(
            (item) =>
              item.status === 'pending' && item.status !== undefined
          )
        );
        transactionsAll.push(
          data.filter((item) => item.status === 'pending')
        );
        setTransactionsData(
          transactionsAll.filter((item) => item.length !== 0)
        );
      })
      .catch((error) => console.log(error.message));
  };

  console.log(transactionsData);

  return (
    <div>
      <MessageContextObj.Provider
        value={{
          userId,
          amountofMessage:
            portfoliosData.length + transactionsData.length,
        }}
      >
        {children}
      </MessageContextObj.Provider>
    </div>
  );
};

export default MessageContextWrapper;
