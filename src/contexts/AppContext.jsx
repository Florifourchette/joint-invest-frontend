import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AppContextObj = createContext();

export const useAppContext = () => useContext(AppContextObj);

const AppContextWrapper = ({ children }) => {
  const [contextStockData, setContextStockData] = useState([]);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const stockInfos = await axios("http://localhost:3000/api/stocks");
        setContextStockData(stockInfos.data);
        console.log("stock infos", stockInfos.data);
      } catch (error) {
        console.log("error fetching stocks", error.message);
      }
    }
    fetchStocks();
  }, []);

  return (
    <AppContextObj.Provider value={{ contextStockData }}>
      {children}
    </AppContextObj.Provider>
  );
};

export default AppContextWrapper;
