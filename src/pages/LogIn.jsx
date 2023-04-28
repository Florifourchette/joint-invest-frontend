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
    <div className="container-fluid" style={{ minWidth: "375px" }}>
      <div className="ui middle aligned center aligned grid">
        <div className="column w-100">
          <h2 className="ui image header">
            <div className="content" style={{ marginTop: "4rem" }}>
              Login
            </div>
          </h2>
          <Form
            onSubmit={handleSubmit}
            error={!!error}
            loading={loading}
            className="ui large form"
            style={{ marginTop: "1rem" }}
          >
            <div className="ui stacked secondary  segment">
              <Form.Field className="field">
                <div className="ui left icon input">
                  <i className="envelope icon"></i>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail address"
                    required
                    ref={emailRef}
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
                  />
                </div>
              </Form.Field>
              <Button
                className="ui fluid large submit blue button"
                type="submit"
              >
                Login
              </Button>
              <Message error header={error} />
            </div>
          </Form>
          <div className="ui message">
            New to us? <Link to="/signup">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
