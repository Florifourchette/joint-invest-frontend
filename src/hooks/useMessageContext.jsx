import React from 'react';
import { useContext } from 'react';

const useMessageContext = () => {
  useContext(AppContextObj);
};

export default useMessageContext;
