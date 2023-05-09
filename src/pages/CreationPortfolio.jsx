import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import '../../styles/App.css';
import useAuth from '../hooks/useAuth';
import { GrClose } from 'react-icons/gr';
import Navbar from '../components/Navbar';
import AuthIssue from '../components/AuthIssue';

const CreationPortfolio = () => {
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [newPortfolioInitialAmount, setNewPortfolioInitialAmount] =
    useState(0);
  const [newPortfolioUsername, setNewPortfolioUsername] =
    useState('');
  const [uppercaseDetected, setUppercaseDetected] = useState(false);
  const [checkUsername, setCheckUsername] = useState('');
  const { isAuthenticated } = useAuth();
  const Navigate = useNavigate();
  const [countDownToggle, setCountDownToggle] = useState(false);
  const [countDown, setCountDown] = useState(5);

  const { userId } = useParams();

  const handleBack = (e) => {
    e.preventDefault();
    Navigate(`/overview/${userId}`);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/overview')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const containsUppercase = (str) => {
    return Boolean(str.match(/[A-Z]/));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3000/api/creation_portfolio/${userId}`,
        {
          initial_amount: newPortfolioInitialAmount,
          name_of_portfolio: newPortfolioName,
          friend_username: newPortfolioUsername,
        }
      )
      .then(function (response) {
        setCheckUsername(response.data);
      })
      .then(() => {
        setCountDownToggle((prev) => !prev);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setCheckUsername('');
    setUppercaseDetected(false);
  }, [newPortfolioUsername]);

  useEffect(
    (e) => {
      const interval = setInterval(() => {
        if (countDownToggle) {
          if (countDown === 1) {
            Navigate(`/overview/${userId}`);
          } else {
            setCountDown((prev) => prev - 1);
          }
        }
        console.log(countDownToggle);
      }, 1000);
      return () => clearInterval(interval);
    },
    [countDown, countDownToggle]
  );

  return isAuthenticated ? (
    <>
      <div style={{ height: '100vh', width: '375px' }}>
        <div style={{ width: '350px' }}>
          <GrClose
            style={{
              fontSize: '2rem',
              margin: '20px 0 0 20px',
            }}
            onClick={handleBack}
          />
        </div>
        <div style={{ width: '350px', margin: '0 auto 5rem auto' }}>
          <h1>New Portfolio</h1>
          <p className="page-description">
            Start a new portfolio by setting an initial amount and
            inviting your friend to the portfolio.
          </p>
          <Form
            onSubmit={handleSubmit}
            className="creation_form"
            style={{
              background: '#FFD600',
              minHeight: '200px',
              boxShadow: '0 6px 6px hsl(0deg 0% 0% / 0.3)',
              borderRadius: '10px',
            }}
          >
            <Form.Field style={{ marginTop: '2em' }}>
              <label>Portfolio name</label>
              <input
                placeholder="Portfolio name"
                onChange={(e) => setNewPortfolioName(e.target.value)}
                requires
                style={{
                  border: 'solid 1px #31231E',
                  width: '300px',
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Initial amount</label>
              <input
                placeholder="Initial amount"
                onChange={(e) =>
                  setNewPortfolioInitialAmount(e.target.value)
                }
                type="number"
                required
                style={{
                  border: 'solid 1px #31231E',
                  width: '300px',
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Friend username</label>
              <input
                placeholder="Friend username"
                onChange={(e) =>
                  containsUppercase(e.target.value)
                    ? setUppercaseDetected(true)
                    : setNewPortfolioUsername(e.target.value)
                }
                required
                style={{
                  border: 'solid 1px #31231E',
                  width: '300px',
                }}
              />
              {checkUsername === 'user not found' ? (
                <p>User has not been found</p>
              ) : (
                <p></p>
              )}
              {checkUsername === 'identical ids' ? (
                <p>You cannot create a portfolio with yourself</p>
              ) : (
                <p></p>
              )}
              {uppercaseDetected ? (
                <p>the username should be in lowercase</p>
              ) : (
                <p></p>
              )}
            </Form.Field>
            <Button
              type="submit"
              className="hex-button"
              style={{
                background: '#31231E',
                color: 'white',
                margin: '0 auto 2em auto',
                padding: '15px 20px 15px 20px',
              }}
            >
              Submit
            </Button>
            {countDownToggle ? (
              <p className="countdown-text">
                <strong>Portfolio {newPortfolioName}</strong> has been
                created. You will be directed to overview page in{' '}
                {countDown} seconds.
              </p>
            ) : (
              <></>
            )}
          </Form>
        </div>
        {/* <Navbar /> */}
      </div>
    </>
  ) : (
    <AuthIssue />
  );
};

export default CreationPortfolio;
