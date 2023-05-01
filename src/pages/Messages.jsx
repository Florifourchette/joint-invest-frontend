import Navbar from "../components/Navbar";
import { getDashboardData } from "../../utils/APIcalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Messages() {
  const [dashboardData, setDashboardData] = useState([]);

  const { userId } = useParams;

  useEffect(() => {
    getDashboardData(userId)
      .then((data) => {
        setDashboardData(
          data.portfolios.filter((item) => item.portfolio_status !== "deleted")
        );
      })
      .catch((error) => console.error(error));
  }, [userId]);

  console.log(dashboardData);

  return (
    <div>
      <h1>Messages</h1>

      <Navbar />
    </div>
  );
}
