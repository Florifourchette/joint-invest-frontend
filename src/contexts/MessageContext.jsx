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

        setPortfoliosData(portfolioInfos.length);
        data;
      })
      .then((data) => {
        setPortfolioIds(
          data.portfolios.map((item) => item.portfolio_id)
        );
      })
      .then((data) => {
        const transactions = portfolioIds.forEach((id) =>
          getTransactionsData(id)
        );
        setTransactionsData(transactions);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(transactionsData);
  return (
    <div>
      <MessageContextObj.Provider value={{ userId, portfoliosData }}>
        {children}
      </MessageContextObj.Provider>
    </div>
  );
};

export default MessageContextWrapper;
