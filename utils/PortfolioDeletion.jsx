import axios from 'axios';
import { getDashboardData } from './APIcalls';
import { getMessages } from './MessagesAPIcalls';

export const setPortfolioStatus = async (
  portfolio_id,
  user_id,
  currentStatus,
  buttonStatus,
  setMessages,
  setLoading
) => {
  await axios
    .post(`http://localhost:3000/api/portfolio/${portfolio_id}`, {
      user_id_status_request: user_id,
      current_portfolio_status: currentStatus,
      button_response: buttonStatus,
    })
    .then(function (response) {
      return response;
    })
    // .then(
    //   getDashboardData(user_id).then((data) => {
    //     setNewData(
    //       data.portfolios.filter(
    //         (item) => item.portfolio_status !== 'deleted'
    //       )
    //     );
    //   })
    // )
    .then(getMessages(user_id).then((data) => setMessages(data)))
    .then((data) => setLoading(false))
    .catch(function (error) {
      console.log(error);
    });
};
