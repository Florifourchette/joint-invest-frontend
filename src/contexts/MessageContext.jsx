import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
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
  const [portfoliosData, setPortfoliosData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [portfolioIds, setPortfolioIds] = useState([]);
  const [message, setMessage] = useState(false);
  const transactionsAll = useRef([]);

  useEffect(() => {
    getDashboardData(userId)
      .then((data) => {
        const portfolioInfos = data.portfolios.filter(
          (item) =>
            item.portfolio_status !== 'deleted' &&
            item.portfolio_status !== 'activated'
        );

        setPortfoliosData(portfolioInfos);
        setPortfolioIds(
          portfolioInfos.map((item) => item.portfolio_id)
        );
      })
      .catch((error) => console.error(error));
  }, [message]);

  useEffect(() => {
    console.log('useEffect started');
    console.log(portfolioIds);
    portfolioIds.forEach((id) => {
      getTransactions(id);
    });
  }, [portfolioIds, message]);

  const getTransactions = (id) => {
    console.log(id);
    getTransactionsData(id)
      .then((data) => {
        console.log(data.filter((item) => item.status === 'pending'));
        transactionsAll.current.push(
          data.filter((item) => item.status === 'pending')
        );
        setTransactionsData(
          transactionsAll.current.filter((item) => item.length !== 0)
        );
      })
      .catch((error) => console.log(error.message));
  };

  console.log(transactionsData, message);

  const allDataLength =
    portfoliosData.length + transactionsData.length;

  console.log(allDataLength);
  console.log(portfoliosData);
  console.log(transactionsData);

  useEffect(() => {
    if (allDataLength === 0) {
      setMessage((prev) => !prev);
    } else {
      setMessage(allDataLength);
    }
  }, [portfoliosData, transactionsData]);

  return (
    <div>
      <MessageContextObj.Provider
        value={{
          userId,
          amountofMessage: message,
        }}
      >
        {children}
      </MessageContextObj.Provider>
    </div>
  );
};

export default MessageContextWrapper;
