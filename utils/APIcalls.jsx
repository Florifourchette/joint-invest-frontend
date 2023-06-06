import axios from 'axios';

export function getDashboardData(userId) {
  return fetch(`http://localhost:3000/api/overview/${userId}`, {
    method: 'GET',
  }).then((response) => response.json());
}

export function getTransactionsData(portfolioId) {
  return fetch(
    `http://localhost:3000/api/transaction/${portfolioId}`,
    {
      method: 'GET',
    }
  ).then((response) => {
    // console.log(response);
    return response.json();
  });
}

export function writeTransaction(portfolioId, transactionData) {
  return fetch(
    `http://localhost:3000/api/transaction/${portfolioId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    }
  ).then((response) => {
    console.log(response);
    if (response.ok) {
      window.location.reload();
    }
    return response.json();
  });
}

export function confirmOrCancelTransaction(
  portfolioId,
  transactionId,
  transactionData
) {
  return fetch(
    `https://joint-invest-back-end.onrender.com/api/transaction/${portfolioId}/${transactionId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    }
  ).then((response) => {
    console.log(response);
    if (response.ok) {
      window.location.reload();
    }
    return response.json();
  });
}

export function getPendingTransactions(portfolioId) {
  return fetch(
    `https://joint-invest-back-end.onrender.com/api/transaction/pendingTransactions/${portfolioId}`,
    {
      method: 'GET',
    }
  ).then((response) => {
    // console.log(response);
    return response.json();
  });
}

export const getOverviewData = () => {
  axios
    .get('http://localhost:3000/api/overview')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export function getShareNumbers(portfolioId) {
  return fetch(`http://localhost:3000/api/portfolio/${portfolioId}`, {
    method: 'GET',
  }).then((response) => {
    // console.log(response);
    return response.json();
  });
}
