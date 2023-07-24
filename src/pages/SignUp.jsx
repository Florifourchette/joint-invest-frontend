import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';
import useAuth from '../hooks/useAuth';

export default function SignUp() {
  const { loading, error, signUpUser } = useAuth();
  const [uppercaseDetected, setUppercaseDetected] = useState('');
  const [username, setUsername] = useState('');
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUpUser(
      username,
      emailRef.current.value,
      passwordRef.current.value
    );
  };

  useEffect(() => {
    setUppercaseDetected(false);
  }, [username]);

  console.log(username);

  const containsUppercase = (str) => {
    return Boolean(str.match(/[A-Z]/));
  };

  return (
    <div style={{ height: '100vh', width: '375' }}>
      <div className="container-fluid" style={{ maxWidth: '350px' }}>
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h1>Register</h1>
            <Form
              onSubmit={handleSubmit}
              className="ui large form"
              style={{ marginTop: '1rem' }}
              error={!!error}
              loading={loading}
            >
              <div
                className="ui stacked secondary  segment"
                style={{
                  background: '#FFD600',
                  minHeight: '250px',
                  boxShadow: '0 6px 6px hsl(0deg 0% 0% / 0.3)',
                }}
              >
                <Form.Field className="field">
                  <div
                    className="ui left icon input"
                    style={{ marginTop: '10px' }}
                  >
                    <i className="user icon"></i>
                    <input
                      required
                      type="text"
                      name="username"
                      placeholder="username"
                      onChange={(e) =>
                        containsUppercase(e.target.value)
                          ? setUppercaseDetected(true)
                          : setUsername(e.target.value)
                      }
                      ref={nameRef}
                      style={{
                        border: 'solid 1px #31231E',
                        width: '300px',
                      }}
                    />
                  </div>
                  {uppercaseDetected ? (
                    <p>the username should be in lowercase</p>
                  ) : (
                    <></>
                  )}
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
                      style={{
                        border: 'solid 1px #31231E',
                        width: '300px',
                      }}
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
                      style={{
                        border: 'solid 1px #31231E',
                        width: '300px',
                      }}
                    />
                  </div>
                </Form.Field>
                <Button
                  className="hex-button submit"
                  type="submit"
                  style={{
                    background: '#31231E',
                    color: 'white',
                    margin: 'auto',
                    padding: '15px 20px 15px 20px',
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
                background: '#FFD600',
                boxShadow: '0 6px 6px hsl(0deg 0% 0% / 0.3)',
              }}
            >
              <p style={{ fontWeight: '600' }}>
                Already have an account?{' '}
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
