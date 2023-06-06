import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { GrMail } from 'react-icons/gr';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillPieChart } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';
import useAuth from '../hooks/useAuth';
import { useMessageContext } from '../contexts/MessageContext';

const Navbar = () => {
  const { userLogin, loading } = useAuth();
  const messagesContextValues = useMessageContext();

  const numberOfMessages =
    messagesContextValues.messages.portfoliosMessages?.length +
    messagesContextValues.messages.transactionsMessages?.length;

  console.log(numberOfMessages);
  return (
    <div className="navi fixed-bottom navbar">
      {loading ? (
        <div>
          <CgSpinner />
          <p>Loading.....</p>
        </div>
      ) : (
        <div className="navBar_container">
          <div>
            <NavLink
              className="navBarLink"
              to={`/overview/${userLogin?.id}`}
              style={({ isActive }) => {
                return isActive
                  ? {
                      color: 'white',
                      fontWeight: 'bolder',
                      fontSize: '0.9em',
                      textDecoration: 'none',
                    }
                  : {
                      color: 'white',
                      fontWeight: 'thin',
                      fontSize: '0.9em',
                      textDecoration: 'none',
                    };
              }}
            >
              <AiFillPieChart
                style={{
                  fontSize: '1.7rem',
                  color: 'white',
                  marginBottom: '2px',
                }}
              />
              Overview
            </NavLink>
          </div>
          <div>
            <NavLink
              className="navBarLink"
              to={`/messages/${userLogin?.id}`}
              style={({ isActive }) => {
                return isActive
                  ? {
                      color: 'white',
                      fontWeight: 'bolder',
                      fontSize: '0.9em',
                      textDecoration: 'none',
                    }
                  : {
                      color: 'white',
                      fontWeight: 'thin',
                      fontSize: '0.9em',
                      textDecoration: 'none',
                    };
              }}
            >
              <span className="message-notifications">
                {numberOfMessages}
              </span>
              <GrMail
                style={{
                  fontSize: '1.65rem',
                  color: 'white',
                  marginBottom: '2px',
                }}
              />
              Messages
            </NavLink>
          </div>
          <div className="navBarLink">
            <span>{messagesContextValues.amountMessages}</span>
            <NavLink
              className="navBarLink"
              to={`/profile/${userLogin?.id}`}
              style={({ isActive }) => {
                return isActive
                  ? {
                      color: 'white',
                      fontWeight: 'bolder',
                      fontsize: '1rem',
                      fontSize: '0.9em',
                      textDecoration: 'none',
                    }
                  : {
                      color: 'white',
                      fontWeight: 'thin',
                      fontsize: '12px',
                      fontSize: '0.9em',
                      textDecoration: 'none',
                    };
              }}
            >
              <FaUserAlt
                style={{
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '2px',
                }}
              />
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
