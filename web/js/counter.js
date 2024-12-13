// counter.js
window.addEventListener('DOMContentLoaded', (event) => {
  getVisitCount();
});

const functionApi = 'https://joycefunc.azurewebsites.net/api/hello';

const getVisitCount = () => {
  fetch(functionApi)
      .then(response => response.text()) // Get the raw response as text
      .then(response => {
          count = parseInt(response); // Convert to integer
          if (isNaN(count)) {
              console.error("Invalid response from API:", response);
              document.getElementById('counter').innerText = "Error";
          } else {
              console.log("Hello, you are visitor number " + count);
              document.getElementById('counter').innerText = response;
          }
      })
      .catch(error => {
          console.error("Failed to fetch visitor count:", error);
          document.getElementById('counter').innerText = "Error";
      });
};