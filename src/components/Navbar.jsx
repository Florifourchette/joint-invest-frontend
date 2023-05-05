import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { GrMail } from 'react-icons/gr';
import { FaUserAlt } from 'react-icons/fa';
import { AiFillPieChart } from 'react-icons/ai';
import { CgSpinner } from 'react-icons/cg';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { userLogin, loading } = useAuth();

  return (
    <div className="navi fixed-bottom navbar w-100">
      {loading ? (
        <div>
          <CgSpinner />
          <p>Loading.....</p>
        </div>
      ) : (
        <div className="navBar_container">
          <div className="navBarLink">
            <AiFillPieChart
              style={{
                fontSize: '1.7rem',
                color: 'white',
                marginBottom: '2px',
              }}
            />
            <NavLink
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
              Overview
            </NavLink>
          </div>
          <div className="navBarLink">
            <GrMail
              style={{
                fontSize: '1.65rem',
                color: 'white',
                marginBottom: '2px',
              }}
            />
            <NavLink
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
              Messages
            </NavLink>
          </div>
          <div className="navBarLink">
            <FaUserAlt
              style={{
                fontSize: '1.5rem',
                color: 'white',
                marginBottom: '2px',
              }}
            />
            <NavLink
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
              Profile
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
