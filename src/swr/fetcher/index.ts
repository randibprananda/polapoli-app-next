import Router from 'next/router';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then(handleResponse);

function handleResponse(response: any) {
  return response.json().then((data: any) => {
    if (!response.ok) {
      if (401 === response.status) {
        Router.push('/401');
      }
      if (403 === response.status) {
        Router.push('/403');
      }

      const error = data || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export default fetcher;
