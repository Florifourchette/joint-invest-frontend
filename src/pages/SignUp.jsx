import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import useAuth from "../hooks/useAuth";

export default function SignUp() {
  const { loading, error, signUpUser } = useAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpUser(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
  };

  return (
    <div
      style={{ minWidth: "500px", background: "#FFF3BE", minHeight: "100vh" }}
    >
      <div className="container-fluid" style={{ maxWidth: "350px" }}>
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h1>Register</h1>
            <Form
              onSubmit={handleSubmit}
              className="ui large form"
              style={{ marginTop: "1rem" }}
              error={!!error}
              loading={loading}
            >
              <div
                className="ui stacked secondary  segment"
                style={{ background: "#FFD600", minHeight: "250px" }}
              >
                <Form.Field className="field">
                  <div
                    className="ui left icon input"
                    style={{ marginTop: "10px" }}
                  >
                    <i className="user icon"></i>
                    <input
                      required
                      type="text"
                      name="username"
                      placeholder="username"
                      ref={nameRef}
                      style={{ border: "solid 1px #31231E", width: "300px" }}
                    />
                  </div>
                </Form.Field>
                <Form.Field className="field">
                  <div className="ui left icon input">
                    <i className="envelope icon"></i>
                    <input
                      required
                      type="text"
                      name="email"
                      placeholder="E-mail address"
                      ref={emailRef}
                      style={{ border: "solid 1px #31231E", width: "300px" }}
                    />
                  </div>
                </Form.Field>
                <Form.Field className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="Password"
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
            <div className="ui message" style={{ background: "#FFD600" }}>
              <p style={{ fontWeight: "600" }}>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
