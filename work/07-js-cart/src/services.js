export function fetchCatList() {
  return fetch(`/products`)
    .catch( () => {
      return Promise.reject({ error: 'networkError' });
    })
    .then( response => {
      if(!response.ok) {
        return response.json().then( info => Promise.reject(info) );
      }
      return response.json();
    });
}
