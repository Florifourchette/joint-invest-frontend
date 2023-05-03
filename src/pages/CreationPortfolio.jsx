import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import "../../styles/App.css";
import useAuth from "../hooks/useAuth";
import LogIn from "./LogIn";
import { Message } from "semantic-ui-react";
import { GrClose } from "react-icons/gr";

const CreationPortfolio = () => {
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [newPortfolioInitialAmount, setNewPortfolioInitialAmount] = useState(0);
  const [newPortfolioUsername, setNewPortfolioUsername] = useState("");
  const [uppercaseDetected, setUppercaseDetected] = useState(false);
  const [checkUsername, setCheckUsername] = useState("");
  const { isAuthenticated } = useAuth();
  const Navigate = useNavigate();

  const { userId } = useParams();

  const handleBack = (e) => {
    e.preventDefault();
    Navigate(`/overview/${userId}`);
  };

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

  // return isAuthenticated ? (
  return (
    <>
      <div style={{ width: "450px" }}>
        <GrClose
          style={{ fontSize: "2rem", position: "absolute", marginTop: "20px" }}
          onClick={handleBack}
        />
      </div>
      <h1>Add portfolio</h1>
      <p className="page-description">Start a new portfolio with your friend</p>
      <Form onSubmit={handleSubmit} className="creation_form">
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
          className="creation_submitbtn"
          style={{
            width: "9em",
            height: "2em",
            fontSize: "1.3em",
            backgroundColor: "#074ee8",
            border: "none",
            color: "white",
            borderRadius: "5px",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginTop: "1.5em",
            marginBottom: "1em",
          }}
        >
          Submit
        </Button>
      </Form>
      {/* <Navbar /> */}
    </>
  );
  // : (
  //   <div>
  //     <div className="d-flex justify-content-center">
  //       <Message style={{ color: 'red' }}>
  //         You are not logged in, please login!
  //       </Message>
  //     </div>
  //     <LogIn />
  //   </div>
  // );
};

export default CreationPortfolio;
