export function getMessages(userId) {
  return fetch(`https://joint-invest-back-end.onrender.com/api/messages/${userId}`, {
    method: 'GET',
  }).then((response) => response.json());
}
