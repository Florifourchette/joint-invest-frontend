import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { getMessages } from '../../utils/MessagesAPIcalls';
import useAuth from '../hooks/useAuth';

export const MessageContextObj = createContext();
export const useMessageContext = () => useContext(MessageContextObj);

const MessageContextWrapper = ({ children }) => {
  const userDetails = useAuth();
  const userId = userDetails.userLogin.id;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userId !== null) {
      getMessages(userId)
        .then((data) => setMessages(data))
        .catch((error) => console.log(error));
    }
  }, [userDetails]);

  return (
    <div>
      <MessageContextObj.Provider
        value={{
          userId,
          messages,
        }}
      >
        {children}
      </MessageContextObj.Provider>
    </div>
  );
};

export default MessageContextWrapper;
