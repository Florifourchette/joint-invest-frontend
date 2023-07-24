import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMessageContext } from '../contexts/MessageContext';

export default function LogoHome() {
  const navigate = useNavigate();
  const allMessages = useMessageContext();

  const reDirect = (e) => {
    e.preventDefault();
    navigate('/instructions');
  };

  return (
    <>
      <div
        style={{ width: '100%', background: '#FFD600' }}
        onClick={reDirect}
      >
        <div
          className="d-flex align-items-center"
          style={{ minHeight: '100vh' }}
        >
          <img
            src="/beehive.png"
            alt="company_logo"
            style={{ width: '375px' }}
          />
        </div>
      </div>
    </>
  );
}
