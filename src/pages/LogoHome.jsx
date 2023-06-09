import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoHome() {
  const navigate = useNavigate();

  const reDirect = (e) => {
    e.preventDefault();

    navigate('/instructions');
  };

  return (
    <div
      style={{ width: '100%', background: '#FFD600' }}
      onClick={reDirect}
    >
      <a
        href="https://joint-invest-back-end.onrender.com"
        target="_blank"
      >
        {' '}
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
      </a>
    </div>
  );
}
