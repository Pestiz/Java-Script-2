const loginBtn = document.getElementById('loginBtn');

const loginForm = {
  loginEmail: document.getElementById('loginEmail'),
  loginPassword: document.getElementById('loginPassword'),
};

const loginError = document.getElementById('loginError');

loginBtn.addEventListener('click', e => {
  e.preventDefault();
  const { loginEmail, loginPassword } = loginForm;

  fetch('https://api.noroff.dev/api/v1/social/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(json => {
      console.log(json.accessToken);
      if (!(json.accessToken === null) && !(json.accessToken === undefined)) {
        loginError.textContent = '';
        localStorage.setItem('accessToken', json.accessToken);
        window.location = `${window.location.origin}/index.html`;
      } else {
        loginError.textContent = 'Someting went wrong';
      }
    });
});
