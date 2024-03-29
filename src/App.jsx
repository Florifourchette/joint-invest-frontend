import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import '../styles/App.css';
import { Link, Routes, Route } from 'react-router-dom';
import CreationPortfolio from './pages/CreationPortfolio';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Transactions from './pages/Transactions';
import Orderbook from './pages/Orderbook';
import AuthStateContext from './contexts/AuthContext';
import AppContextWrapper from './contexts/AppContext';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import LogoHome from './pages/LogoHome';
import Instructions from './pages/Instructions';
import '../styles/Media.css';
import MessageContextWrapper from './contexts/MessageContext';

function App() {
  return (
    <>
      <div className="background">
        <AuthStateContext>
          <AppContextWrapper>
            <MessageContextWrapper>
              <Routes>
                <Route path="/" element={<LogoHome />} />
                <Route
                  path="/instructions"
                  element={<Instructions />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route
                  path="/overview/:userId"
                  element={<Dashboard />}
                />
                <Route
                  path="/portfolio/:id"
                  element={<Portfolio />}
                />
                <Route
                  path="/transactions/:portfolioId"
                  element={<Transactions />}
                />
                <Route
                  path="/orderbook/:portfolio_id"
                  element={<Orderbook />}
                />
                <Route
                  path="/messages/:userId"
                  element={<Messages />}
                />
                <Route
                  path="/profile/:userId"
                  element={<Profile />}
                />
                <Route
                  path="/create_portfolio/:userId"
                  element={<CreationPortfolio />}
                />
              </Routes>
            </MessageContextWrapper>
          </AppContextWrapper>
        </AuthStateContext>
      </div>
    </>
  );
}

export default App;
