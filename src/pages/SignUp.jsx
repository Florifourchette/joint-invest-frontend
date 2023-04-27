import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import axios from "axios";

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const {
        data: { token: mytoken, user_id: myid },
      } = await axios.post("http://localhost:3000/api/user/signup", {
        username: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(mytoken);
      setError(null);
      localStorage.setItem("token", JSON.stringify(mytoken));
      setToken(mytoken);
      setIsAuthenticated(true);
      navigate(`/portfolio/${myid}`, { replace: true });
    } catch (e) {
      console.error(e);
      setError(e.response.data.error);
    }
    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: "2rem" }}>
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
