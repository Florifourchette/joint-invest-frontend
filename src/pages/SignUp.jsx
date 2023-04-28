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
    <div className="container-fluid" style={{ minWidth: "375px" }}>
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image header">
            <div className="content" style={{ marginTop: "4rem" }}>
              Register
            </div>
          </h2>
          <Form
            onSubmit={handleSubmit}
            className="ui large form"
            style={{ marginTop: "1rem" }}
            error={!!error}
            loading={loading}
          >
            <div className="ui stacked secondary  segment">
              <Form.Field className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    required
                    type="text"
                    name="username"
                    placeholder="username"
                    ref={nameRef}
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
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
