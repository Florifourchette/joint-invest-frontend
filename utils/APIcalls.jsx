export function getDashboardData(userId){
  return fetch (`http://localhost:3000/api/overview/${userId}`, {
    method: 'GET'
  })
    .then(response => response.json())
}

export function getTransactionsData(portfolioId){
  return fetch (`http://localhost:3000/api/transaction/${portfolioId}` ,{
    method: 'GET'
  })
    .then(response => {
      console.log(response); 
      return response.json();
    })
}

export function writeTransaction(portfolioId, transactionData) {
  
  return fetch(`http://localhost:3000/api/transaction/${portfolioId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transactionData)
  })
  .then(response => {
    console.log(response);
    return response.json();
  })
  .catch(error => {
    console.error(error);
  });
}

export function confirmTransaction(portfolioId, transactionId, transactionData) {
  return fetch(`http://localhost:3000/api/transaction/${portfolioId}/${transactionId}`, {
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transactionData)
  })
  .then(response =>{
    console.log(response);
    if (response.ok) {
      window.location.reload();
    }
    return response.json();
  })
}