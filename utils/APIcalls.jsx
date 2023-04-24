export function getDashboardData(){
  return fetch (`http://localhost:3000/1`, {
    method: 'GET'
  })
    .then(response => response.json())
}