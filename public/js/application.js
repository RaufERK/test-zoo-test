const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const subscribeBtns = document.querySelectorAll('.subcribe-btn');

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const userName = document.querySelector('#userName').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#confirm-password').value;
    const warningDiv = document.querySelector('#warning');
    warningDiv.textContent = '';

    if (password !== passwordConfirm) {
      warningDiv.textContent = 'Passwords do not match...';
    } else {
      console.log(email, userName, password);
      const data = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email, userName, password }),
      });
      if (data.status === 200) {
        window.location = '/';
      } else {
        warningDiv.textContent = 'Registering user...';
        const error = await data.text();
        warningDiv.textContent = error;
      }
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const warningDiv = document.querySelector('#warning');
    warningDiv.textContent = '';

    const data = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    });
    if (data.status === 200) {
      window.location = '/';
    } else {
      warningDiv.textContent = 'Loading...';
      const error = await data.text();
      warningDiv.textContent = error;
      warningDiv.style.display = 'block';
    }
  });
}

if (subscribeBtns) {
  // const btns = Array.from(subscribeBtns).map((btn) => btn.id);
  // loadSubscribers(btns);

  subscribeBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      event.preventDefault();

      const channelId = event.target.id;
      if (event.target.textContent === 'subscribe') {
        subscribe(channelId, event.target); // comes from /js/helpers.js
      }
      if (event.target.textContent === 'unsubscribe') {
        unsubscribe(channelId, event.target); // comes from /js/helpers.js
      }
    });
  });
}
