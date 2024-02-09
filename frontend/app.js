// app.js

/*
 document.getElementById('dataForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const dataInput = document.getElementById('dataInput').value;

  //Send the data to the backend
  fetch('http://64.227.164.200:5002/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: dataInput }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Data submitted successfully:', data);
      alert('Data submitted successfully!');
    })
    .catch(error => {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    });
});*/
const axios = require('axios');
document.getElementById('dataForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const dataInput = document.getElementById('dataInput').value;

  // Send the data to the backend using Axios
  axios.post('http://64.227.164.200:5002/api', { data: dataInput }, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log('Data submitted successfully:', response.data);
      alert('Data submitted successfully!');
    })
    .catch(error => {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    });
});
