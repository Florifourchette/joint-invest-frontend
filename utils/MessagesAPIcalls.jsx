export function getMessages(userId) {
  return fetch(`http://localhost:3000/api/messages/${userId}`, {
    method: 'GET',
  }).then((response) => response.json());
}
