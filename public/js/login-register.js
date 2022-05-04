const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const btnRegister = document.getElementById('btn-register');
const usernameRegister = document.getElementById('username-register');
const passwordRegister = document.getElementById('password-register');

const btnLogin = document.getElementById('btn-login');
const usernameLogin = document.getElementById('username-login');
const passwordLogin = document.getElementById('password-login');

btnRegister.addEventListener('click', async (e) => {
  e.preventDefault();

  const response = await fetch('/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: usernameRegister.value,
      password: passwordRegister.value,
    }),
  });

  const parsedResponse = await response.json();
  switch (response.status) {
    case 400:
      invalidAlert(parsedResponse.message);
      break;
    case 201:
      localStorage.setItem('token', parsedResponse.token)
      successAlert('You have registered');
      break;
    default:
  }
});

btnLogin.addEventListener('click', async (e) => {
  e.preventDefault();

  const response = await fetch('/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: usernameLogin.value,
      password: passwordLogin.value,
    }),
  });

  const parsedResponse = await response.json();
  switch (response.status) {
    case 400:
      invalidAlert(parsedResponse.message);
      break;
    case 200:
      localStorage.setItem('token', parsedResponse.token);
      successAlert('Success');
      break;
    default:
  }
});

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});
