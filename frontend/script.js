'use strict';

const form = document.querySelector('form');
const message = document.querySelector('#message');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const text = document.querySelector('p');

const handleSubmit = async event => {
  event.preventDefault();

  try {
    const res = await fetch('http://localhost:4000/api/sendMessage', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message.value,
        email: email.value,
        phoneNo: phone.value,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
      text.innerText = 'Message successfully sent to the user.';
      text.style.display = 'block';

      message.value = '';
      email.value = '';
      phone.value = '';
    }

    if (res.status === 400) {
      text.innerText = 'Failed to send message to the user. Please try again.';
      text.style.display = 'block';
    }
  } catch (err) {
    console.log(err.message);
  }
};

form.addEventListener('submit', handleSubmit);
