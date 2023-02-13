'use strict';

const form = document.querySelector('form');
const nameInput = document.querySelector('.name');
const emailInput = document.querySelector('.email');
const phoneInput = document.querySelector('.phone');
const text = document.querySelector('p');

const handleSubmit = async event => {
  event.preventDefault();

  try {
    const response = await fetch('/sendData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameInput.value(),
        email: emailInput.value(),
        phoneNo: phoneInput.value(),
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log(data);
      text.innerText = 'Message successfully sent to the user.';
      text.style.display = 'block';

      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
    }
  } catch (err) {
    console.log(err.message);
    text.innerText = 'Failed to send message to the user. Please try again.';
    text.style.display = 'block';
  }
};

form.addEventListener('submit', handleSubmit);
