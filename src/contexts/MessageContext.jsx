import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { getMessages } from '../../utils/MessagesAPIcalls';
import useAuth from '../hooks/useAuth';
import { setPortfolioStatus } from '../../utils/PortfolioDeletion';

export const MessageContextObj = createContext();
export const useMessageContext = () => useContext(MessageContextObj);

const MessageContextWrapper = ({ children }) => {
  const userDetails = useAuth();
  const userId = userDetails.userLogin.id;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId !== null) {
      getMessages(userId)
        .then((data) => setMessages(data))
        .catch((error) => console.log(error));
    }
  }, [userDetails, loading]);

  const retrieveData = (portfolio_id, userId, action, status) => {
    setLoading(true);
    setPortfolioStatus(
      portfolio_id,
      userId,
      action,
      status,
      setMessages,
      setLoading
    );
  };

  return (
    <div>
      <MessageContextObj.Provider
        value={{
          userId,
          messages,
          retrieveData,
          loading,
        }}
      >
        {children}
      </MessageContextObj.Provider>
    </div>
  );
};

export default MessageContextWrapper;
