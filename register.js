const registerBtn = document.getElementById('registerBtn');

const registerForm = {
  registerName: document.getElementById('registerName'),
  registerEmail: document.getElementById('registerEmail'),
  registerPassword: document.getElementById('registerPassword'),
};

const registerError = document.getElementById('registerError');

registerBtn.addEventListener('click', e => {
  e.preventDefault();

  const { registerName, registerEmail, registerPassword } = registerForm;
  if (registerName.value == '') {
    registerError.textContent = 'Wrong name';
    return;
  }

  if (
    !registerEmail.value.includes('@stud.noroff.no') &&
    !registerEmail.value.includes('@noroff.no')
  ) {
    registerError.textContent = 'Wrong email, must contains @stud.noroff.no or @noroff.no';
    return;
  }

  console.log(registerPassword.value.length);
  if (registerPassword.value.length < 8) {
    registerError.textContent = 'Wrong password';
    return;
  }

  registerError.innerHTML = '';

  fetch('https://api.noroff.dev/api/v1/social/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: registerName.value,
      email: registerEmail.value,
      password: registerPassword.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(json => {
      window.location = `${window.location.origin}/login.html`;
    });
});
