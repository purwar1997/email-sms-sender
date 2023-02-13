'use strict';

const form = document.querySelector('form');
const nameInput = document.querySelector('.name');
const emailInput = document.querySelector('.email');
const phoneInput = document.querySelector('.phone');
const text = document.querySelector('p');

const handleSubmit = async event => {
  event.preventDefault();

  try {
    const res = await fetch('http://localhost:4000/api/sendData', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        phoneNo: phoneInput.value,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
      text.innerText = 'Message successfully sent to the user.';
      text.style.display = 'block';

      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
    }

    if (res.status === 400) {
      text.innerText = 'Failed to send message to the user. Please try again.';
      text.style.display = 'block';
    }
  } catch (err) {
    console.log(err);
  }
};

form.addEventListener('submit', handleSubmit);
