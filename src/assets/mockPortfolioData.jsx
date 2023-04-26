export const mockPortfolioData = [
  {
    overview: [
      {
        id: 1,
        initial_amount: 1000,
        date_created: "2023-04-24T07:54:48.758Z",
        portfolio_activate: false,
        name_of_portfolio: "DummyPortfolio",
        invested_amount: 500,
        available_amount: 123.98,
      },
    ],
    stocks: [
      {
        portfolio_id: 1,
        company_id: "AMZN",
        average_price_sell: 133.76,
        number_of_shares_sell: "3",
        average_price_buy: 112.905,
        number_of_shares_buy: "4",
        current_number_of_stocks: "1",
      },
      {
        portfolio_id: 1,
        company_id: "GOOG",
        average_price_sell: 140,
        number_of_shares_sell: "2",
        average_price_buy: 113.333333333333,
        number_of_shares_buy: "6",
        current_number_of_stocks: "4",
      },
      {
        portfolio_id: 1,
        company_id: "TSLA",
        average_price_sell: 152.22,
        number_of_shares_sell: "2",
        average_price_buy: 133.356,
        number_of_shares_buy: "5",
        current_number_of_stocks: "3",
      },
    ],
  },
];
