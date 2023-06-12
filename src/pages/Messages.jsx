import Navbar from '../components/Navbar';
import { useParams } from 'react-router';
import useAuth from '../hooks/useAuth';
import AuthIssue from '../components/AuthIssue';
import { useMessageContext } from '../contexts/MessageContext';

export default function Messages() {
  const { isAuthenticated } = useAuth();
  const { userId } = useParams();

  const messagesContextValues = useMessageContext();
  const AllMessages = messagesContextValues.messages;

  const { retrieveData, loading } = useMessageContext();

  const portfolioMessages = AllMessages.portfoliosMessages?.map(
    (item) => {
      const newItem = {
        ...item,
        type: 'portfolio',
        company_name: '',
        number_of_shares: 0,
      };
      return newItem;
    }
  );

  console.log('loading status on message page');
  console.log(loading);

  const transactionsMessages = AllMessages.transactionsMessages?.map(
    (item) => {
      const newItem = {
        ...item,
        type: 'transaction',
        initial_amount: 0,
      };
      return newItem;
    }
  );

  const getShorterDate = (date) => {
    const newDate = date.slice(2, 10).replace(/-/g, '.');
    const [year, month, day] = newDate.split('.');
    const newDateString = `${day}.${month}.${year}`;
    return newDateString;
  };

  const allMessagesCleaned = portfolioMessages
    .concat(transactionsMessages)
    .map((item) => {
      let newItem = {};
      if (item.requester_id === parseInt(userId)) {
        newItem = {
          ...item,
          date: getShorterDate(item.date),
          requester_name: 'you',
        };
      } else {
        newItem = {
          ...item,
        };
      }
      return newItem;
    });

  const allData = allMessagesCleaned.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  const handleClick = (portfolio_id, userId, action, status) => {
    retrieveData(portfolio_id, userId, action, status);
  };

  return isAuthenticated ? (
    <>
      <div className="message_page">
        <h1>Messages</h1>
        <div className="message_page_container">
          {allData?.map((item, index) => {
            return (
              <div key={index} className="message-card">
                {/* Info part who created the request and when */}

                <div className="message-name-container">
                  {item.type === 'portfolio' &&
                  item.action === 'pending_activation' ? (
                    <h5>Invitation</h5>
                  ) : item.type === 'portfolio' &&
                    item.action === 'pending_deletion' ? (
                    <h5>Deletion request</h5>
                  ) : (
                    <h5>{item.portfolio_name}</h5>
                  )}
                </div>
                <div className="message-card-container">
                  <div className="message-card-values">
                    <div className="message-info-and-main">
                      <div className="message-card-value-info">
                        <h4
                          className="friend"
                          style={{ margin: '0' }}
                        >
                          {item.requester_name}
                        </h4>
                        <img
                          src="/bee.png"
                          alt="friends"
                          style={{ width: '30px' }}
                        />

                        <p className="message-date">
                          {getShorterDate(item.date)}
                        </p>
                      </div>

                      <div className="message-card-value-mainDetails">
                        {/* If it concerns a portfolio then you can either activate or delete it */}

                        {item.type === 'portfolio' &&
                        item.action === 'pending_activation' ? (
                          <p
                            style={{
                              textAlign: 'left',
                              marginLeft: '0.5em',
                            }}
                          >
                            request to{' '}
                            <strong>
                              join portfolio {item.portfolio_name}
                            </strong>{' '}
                            send by {item.requester_name}
                          </p>
                        ) : item.type === 'portfolio' &&
                          item.action === 'pending_deletion' ? (
                          <p
                            style={{
                              textAlign: 'left',
                              marginLeft: '0.5em',
                            }}
                          >
                            for{' '}
                            <strong>
                              deleting portfolio {item.portfolio_name}
                            </strong>
                            . Requested by {item.requester_name}
                          </p>
                        ) : item.type === 'transaction' &&
                          item.action === 'Sell' ? (
                          <p
                            style={{
                              textAlign: 'left',
                              marginLeft: '0.5em',
                            }}
                          >
                            <strong>request to sell </strong>{' '}
                            {item.number_of_shares} stock(s) of{' '}
                            {item.company_name}.
                          </p>
                        ) : (
                          <p
                            style={{
                              textAlign: 'left',
                              marginLeft: '0.5em',
                            }}
                          >
                            <strong> request to buy </strong>
                            {item.number_of_shares} stock(s) of{' '}
                            {item.company_name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="message-card-value-status">
                      {item.type === 'transaction' ? (
                        <div></div>
                      ) : item.requester_name !== 'you' ? (
                        <div className="message_button_container">
                          {loading ? (
                            <>
                              <p>
                                Your request will be processed shortly
                              </p>
                              <div
                                class="spinner-border text-dark"
                                role="status"
                              >
                                <span class="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <button
                                className="message_button"
                                onClick={() => {
                                  handleClick(
                                    item.portfolio_id,
                                    userId,
                                    item.action,
                                    'confirmed'
                                  );
                                }}
                              >
                                Confirm
                              </button>
                              <button
                                style={{ background: '#84714F' }}
                                className="message_button"
                                onClick={() => {
                                  handleClick(
                                    item.portfolio_id,
                                    userId,
                                    item.action,
                                    'rejected'
                                  );
                                }}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="message_button_container message-card-value-status">
                          {item.requester_name !== 'you' ? (
                            <p>
                              Waiting for{' '}
                              <span className="message_bold_span">
                                {item.requester_name}
                              </span>
                            </p>
                          ) : (
                            <></>
                          )}
                          {loading ? (
                            <>
                              <p>
                                Your request will be processed shortly
                              </p>
                              <div
                                class="spinner-border text-dark"
                                role="status"
                              >
                                <span class="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </>
                          ) : (
                            <button
                              className="message_button"
                              onClick={() => {
                                handleClick(
                                  item.portfolio_id,
                                  userId,
                                  item.action,
                                  'rejected'
                                );
                              }}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Navbar />
    </>
  ) : (
    <AuthIssue />
  );
}
