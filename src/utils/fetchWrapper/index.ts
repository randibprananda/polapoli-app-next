import Router from 'next/router';

export const fetchWrapper = {
  get,
  post,
  post_multipart,
  put,
  put_multipart,
  delete: _delete
};

function get(url: string) {
  const requestOptions = {
    method: 'GET'
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post_multipart(url: string, body: any) {
  const requestOptions = {
    method: 'POST',
    body: body
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: any) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put_multipart(url: string, body: any) {
  const requestOptions = {
    method: 'PUT',
    body: body
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
  const requestOptions = {
    method: 'DELETE'
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response: any) {
  return response.json().then((data: any) => {
    if (!response.ok) {
      handleErrorByCode(response.status);

      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const handleErrorByCode = (status: number | undefined) => {
  if (400 === status) {
    Router.push('/400');
  }
  if (401 === status) {
    Router.push('/401');
  }
  if (403 === status) {
    Router.push('/403');
  }
  if (500 === status) {
    Router.push('/500');
  }
  if (505 === status) {
    Router.push('/505');
  }
};
