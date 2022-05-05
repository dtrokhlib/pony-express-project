(async function () {
  const response = await fetch('/users/api/auth-verify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (response.status == 401) {
    localStorage.clear('token');
    document.location = '/';
  } else {
    let parsedResponse = await response.json();
    localStorage.setItem('user', parsedResponse.username);
  }
})();

document.querySelector('.logout').addEventListener('click', () => {
  localStorage.clear('token');
  document.location = '/';
});
