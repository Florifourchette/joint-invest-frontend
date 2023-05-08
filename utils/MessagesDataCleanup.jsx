export const cleanDataPortfolio = (
  portfolio,
  setPortfolioDataCleaned
) => {
  setPortfolioDataCleaned(
    portfolio?.map((item) => {
      console.log(item);
      if (item.friend_id === item.user_id_request) {
        for (let j = 0; j < friends.length; j++) {
          console.log(item.user_id_request);
          console.log(friends[j].friend_id);
          if (item.user_id_request === friends[j].friend_id) {
            return {
              type: 'portfolio',
              requester_id: item.user_id_request,
              requester_name: friends[j].friend_username,
              date: item.request_creation_date,
              portfolio_name: item.name_of_portfolio,
              portfolio_id: item.portfolio_id,
              action: item.portfolio_status,
              company_name: '',
              number_of_shares: '',
              initial_amount: item.initial_amount,
            };
          }
        }
      } else {
        return {
          type: 'portfolio',
          requester_id: item.user_id_request,
          requester_name: 'you',
          date: item.request_creation_date,
          portfolio_name: item.name_of_portfolio,
          portfolio_id: item.portfolio_id,
          action: item.portfolio_status,
          company_name: '',
          number_of_shares: '',
          initial_amount: item.initial_amount,
        };
      }
    })
  );
};

export const cleanTransactionsData = (
  transaction,
  setTransactionDataCleaned
) => {
  setTransactionDataCleaned(
    transaction?.flatMap((items) => {
      return items?.map((item) => {
        for (let j = 0; j < friends.length; j++) {
          for (let i = 0; i < portfoliosNames.length; i++) {
            if (
              item.portfolio_id === portfoliosNames[i].portfolio_id
            ) {
              if (item.user_id === friends[j].friend_id) {
                return {
                  type: 'transaction',
                  requester_id: item.user_id,
                  requester_name: friends[j].friend_id,
                  date: item.creating_date,
                  portfolio_name: portfoliosNames[i].portfolio_name,
                  portfolio_id: item.portfolio_id,
                  action: item.type_of_transaction,
                  company_name: item.company_name,
                  number_of_shares: item.number_of_shares,
                  initial_amount: '',
                };
              } else if (item.user_id !== friends[j].friend_id) {
                return {
                  type: 'transaction',
                  requester_id: item.user_id,
                  requester_name: 'you',
                  date: item.creating_date,
                  portfolio_name: portfoliosNames[i].portfolio_name,
                  portfolio_id: item.portfolio_id,
                  action: item.type_of_transaction,
                  company_name: item.company_name,
                  number_of_shares: item.number_of_shares,
                  initial_amount: '',
                };
              }
            }
          }
        }
      });
    })
  );
};
