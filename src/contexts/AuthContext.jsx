import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);
const AuthStateContext = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      const getUser = async () => {
        try {
          setLoading(true);
          const data = await getUserData();
          //console.log(data);
          setUserLogin(data);
          setIsAuthenticated(true);
          setLoading(false);
        } catch (err) {
          setToken(null);
          localStorage.removeItem("token");
          setLoading(false);
        }
      };
      token && getUser();
    }
  }, [token, isAuthenticated]);

  const logInUser = async (email, password) => {
    try {
      setLoading(true);
      const {
        data: { token: mytoken, user: myuser },
      } = await axios.post("http://localhost:3000/api/user/login", {
        email: email,
        password: password,
      });
      console.log(myuser);
      setError(null);
      localStorage.setItem("token", JSON.stringify(mytoken));
      setToken(mytoken);
      setIsAuthenticated(true);
      setUserLogin(myuser);
      navigate(`/overview/${myuser.id}`, { replace: true });
    } catch (e) {
      console.error(e);
      setError(e.response.data.error);
    }
    setLoading(false);
  };

  const signUpUser = async (username, email, password) => {
    try {
      setLoading(true);
      const {
        data: { token: mytoken, user: myuser },
      } = await axios.post("http://localhost:3000/api/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      console.log(myuser);
      setError(null);
      localStorage.setItem("token", JSON.stringify(mytoken));
      setToken(mytoken);
      setIsAuthenticated(true);
      setUserLogin(myuser);
      navigate(`/create_portfolio/${myuser.id}`, { replace: true });
    } catch (e) {
      console.error(e);
      setError(e.response.data.error);
    }
    setLoading(false);
  };

  const logout = () => {
    console.log("login out");
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const getUserData = async () => {
    const { data } = await axios.get("http://localhost:3000/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        error,
        loading,
        isAuthenticated,
        logInUser,
        signUpUser,
        logout,
        getUserData,
        userLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthStateContext;
