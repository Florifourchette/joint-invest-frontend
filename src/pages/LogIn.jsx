import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import useAuth from "../hooks/useAuth";

export default function LogIn() {
  const { loading, error, logInUser } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logInUser(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="container-fluid" style={{ maxWidth: "350px" }}>
        <div className="ui middle aligned center aligned d-flex">
          <div className="column w-100">
            <h1>Login</h1>
            <Form
              onSubmit={handleSubmit}
              error={!!error}
              loading={loading}
              className="ui large form"
              style={{ marginTop: "1rem" }}
            >
              <div
                className="ui stacked secondary segment d-flex flex-column align-items-center"
                style={{
                  background: "#FFD600",
                  minHeight: "200px",
                  boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
                }}
              >
                <Form.Field className="field">
                  <div
                    className="ui left icon input"
                    style={{ marginTop: "10px" }}
                  >
                    <i className="envelope icon"></i>
                    <input
                      type="text"
                      name="email"
                      placeholder="E-mail address"
                      required
                      ref={emailRef}
                      style={{ border: "solid 1px #31231E", width: "300px" }}
                    />
                  </div>
                </Form.Field>
                <Form.Field className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      ref={passwordRef}
                      style={{ border: "solid 1px #31231E", width: "300px" }}
                    />
                  </div>
                </Form.Field>
                <Button
                  className="hex-button submit"
                  type="submit"
                  style={{
                    background: "#31231E",
                    color: "white",
                    margin: "auto",
                    padding: "15px 20px 15px 20px",
                  }}
                >
                  Login
                </Button>
                <Message error header={error} />
              </div>
            </Form>
            <div
              className="ui message"
              style={{
                background: "#FFD600",
                boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
              }}
            >
              <p style={{ fontWeight: "600", textAlign: "center" }}>
                New to us? <Link to="/signup">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
