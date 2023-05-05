import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export default function Profile() {
  const { userLogin, logout } = useAuth();
  const Navigate = useNavigate();
  const { creation_date } = userLogin;
  const date = creation_date.slice(2, 10).replace(/-/g, ".");
  const [year, month, day] = date.split(".");
  const newDateString = `${day}.${month}.${year}`;

  const profilePics = [
    "profile_1.png",
    "profile_2.png",
    "profile_3.png",
    "profile_4.png",
    "profile_5.png",
  ];
  const myPic = Math.floor(Math.random() * 4);

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  const handleBack = (e) => {
    e.preventDefault();
    Navigate(-1);
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <div>
        <h1>Profile</h1>
        <div className="d-flex flex-column align-items-center">
          <img
            src={`/${profilePics[myPic]}`}
            style={{
              width: "150px",
              height: "150px",
            }}
          />
          <h2 style={{ fontWeight: "800", marginTop: "10px" }}>
            {userLogin.username}
          </h2>
          <p style={{ fontWeight: "600" }}>Member since: {newDateString}</p>
          <div className="user-container" style={{ width: "90%" }}>
            <div className="one-user" style={{ justifyContent: "center" }}>
              <div className="user-shade">
                <p style={{ marginBottom: 0 }}>Email:</p>
                <p>{userLogin.email}</p>
              </div>
            </div>
            <div className="one-user" style={{ justifyContent: "center" }}>
              <div className="user-shade">
                <p style={{ marginBottom: 0 }}>Password:</p>
                <p>***********</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleClick}
            className="hex-button user-button"
            type="btn"
            style={{
              marginTop: "0.5rem",
              marginBottom: "6rem",
              padding: "1rem",
              width: "6rem",
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
