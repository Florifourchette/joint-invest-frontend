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