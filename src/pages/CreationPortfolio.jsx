import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import "../../styles/App.css";
import useAuth from "../hooks/useAuth";
import LogIn from "./LogIn";
import { Message } from "semantic-ui-react";

const CreationPortfolio = () => {
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [newPortfolioInitialAmount, setNewPortfolioInitialAmount] = useState(0);
  const [newPortfolioUsername, setNewPortfolioUsername] = useState("");
  const [uppercaseDetected, setUppercaseDetected] = useState(false);
  const [checkUsername, setCheckUsername] = useState("");
  const { isAuthenticated } = useAuth();

  const { userId } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/overview")
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

  const handleSubmit = () => {
    console.log({ userId });
    axios
      .post(`http://localhost:3000/api/creation_portfolio/${userId}`, {
        initial_amount: newPortfolioInitialAmount,
        name_of_portfolio: newPortfolioName,
        friend_username: newPortfolioUsername,
      })
      .then(function (response) {
        setCheckUsername(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setCheckUsername("");
    setUppercaseDetected(false);
  }, [newPortfolioUsername]);

  return isAuthenticated ? (
    <>
      <h1>Add portfolio</h1>
      <p className="page-description">Start a new portfolio with your friend</p>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Portfolio name</label>
          <input
            placeholder="Portfolio name"
            onChange={(e) => setNewPortfolioName(e.target.value)}
            requires
          />
        </Form.Field>
        <Form.Field>
          <label>Initial amount</label>
          <input
            placeholder="Initial amount"
            onChange={(e) => setNewPortfolioInitialAmount(e.target.value)}
            type="number"
            required
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
          />
          {checkUsername === "user not found" ? (
            <p>User has not been found</p>
          ) : (
            <p></p>
          )}
          {checkUsername === "identical ids" ? (
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
          style={{
            width: "13em",
            height: "3em",
            fontSize: "1.5em",
            backgroundColor: "#074ee8",
            border: "none",
            color: "white",
            borderRadius: "5px",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginTop: "1.5em",
          }}
        >
          Submit
        </Button>
      </Form>
    </>
  ) : (
    <div>
      <div className="d-flex justify-content-center">
        <Message style={{ color: "red" }}>
          You are not logged in, please login!
        </Message>
      </div>
      <LogIn />
    </div>
  );
};

export default CreationPortfolio;
