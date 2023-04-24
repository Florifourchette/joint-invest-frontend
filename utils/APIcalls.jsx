export function getDashboardData(userId){
  return fetch (`http://localhost:3000/${userId}`, {
    method: 'GET'
  })
    .then(response => response.json())
}