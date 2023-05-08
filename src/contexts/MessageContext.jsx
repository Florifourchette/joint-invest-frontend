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
  const [portfoliosDataLenght, setPortfoliosDataLenght] = useState(0);
  const [portfolioIds, setPortfolioIds] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    getDashboardData(userId)
      .then((data) => {
        const portfolioInfos = data.portfolios.filter(
          (item) =>
            item.portfolio_status !== 'deleted' &&
            item.portfolio_status !== 'activated'
        );
        if (portfolioInfos.lenght === 0) {
          setPortfoliosDataLenght(0);
        } else {
          setPortfoliosDataLenght(portfolioInfos);
        }
        return data;
      })
      .then((data) => {
        setPortfolioIds(
          data.portfolios.map((item) => item.portfolio_id)
        );
      })
      .then((data) => {
        portfolioIds.forEach((id) => getTransactionsData(id));
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(portfoliosDataLenght);

  return (
    <div>
      <MessageContextObj.Provider
        value={{ userId, portfoliosDataLenght }}
      >
        {children}
      </MessageContextObj.Provider>
    </div>
  );
};

export default MessageContextWrapper;
