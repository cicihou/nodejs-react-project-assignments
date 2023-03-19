export function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify( { username } ),
  })
  .catch( err => Promise.reject({ error: 'network-error' }) )
  .then( response => {
    if(!response.ok) {
      return response.json().then( err => Promise.reject(err) );
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

export function checkSession() {
  return fetch('/api/session/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    }
  })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
}

export function logout() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    }
  })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
}

export function fetchUsers() {
  return fetch('/api/users/', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    }
  })
    .catch( err => Promise.reject({ error: 'network-error' }) )
    .then( response => {
      if(!response.ok) {
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json();
    });
}



