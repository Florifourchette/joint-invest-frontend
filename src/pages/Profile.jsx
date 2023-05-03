import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export default function Profile() {
  const { userLogin, logout } = useAuth();
  const Navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  const handleBack = (e) => {
    e.preventDefault();
    Navigate(-1);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ width: "500px" }}
    >
      <div style={{ margin: "auto" }}>
        {/* <div style={{ width: "450px" }}>
          <BiArrowBack
            style={{
              fontSize: "2rem",
              position: "absolute",
              marginTop: "20px",
            }}
            onClick={handleBack}
          />
        </div> */}
        <h1>Profile</h1>
        <div className="d-flex flex-column align-items-center">
          <img
            src="https://picsum.photos/id/237/200/200"
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
            }}
          />
          <h2>{userLogin.username}</h2>
          <p style={{ fontWeight: "600" }}>
            Member since: {userLogin.creation_date.split("T")[0]}
          </p>
          <div
            style={{
              fontSize: "1.25rem",
              border: "1px solid grey",
              paddingTop: "1.25rem",
              paddingBottom: "1.25rem",
              paddingLeft: "4rem",
              paddingRight: "4rem",
              borderRadius: "10px",
              marginTop: "1rem",
            }}
          >
            <p className="text-left">Email: {userLogin.email}</p>
            <p className="text-left">Password: ***********</p>
          </div>
          <button
            onClick={handleClick}
            className="btn btn-primary"
            type="btn"
            style={{
              marginTop: "3.5rem",
              marginBottom: "1rem",
              padding: "1rem",
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
