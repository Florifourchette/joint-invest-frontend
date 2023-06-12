import {
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import axios from 'axios';

export const AppContextObj = createContext();

export const useAppContext = () => useContext(AppContextObj);

const AppContextWrapper = ({ children }) => {
  const [contextStockData, setContextStockData] = useState([]);
  const [contextUsers, setContextUsers] = useState([]);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const stockInfos = await axios(
          'https://joint-invest-back-end.onrender.com/api/stocks'
        );
        setContextStockData(stockInfos.data);
      } catch (error) {
        console.log('error fetching stocks', error.message);
      }
    }
    async function fetchUsers() {
      try {
        const myUsers = await axios(
          'http://localhost:3000/api/user/all'
        );
        setContextUsers(myUsers.data);
      } catch (error) {
        console.log('error fetching stocks', error.message);
      }
    }
    fetchStocks();
    fetchUsers();
  }, []);

  return (
    <AppContextObj.Provider
      value={{ contextStockData, contextUsers }}
    >
      {children}
    </AppContextObj.Provider>
  );
};

export default AppContextWrapper;
