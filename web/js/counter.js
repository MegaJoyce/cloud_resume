// counter.js
window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
  });
  
  
  const functionApi = 'https://joycefunc.azurewebsites.net/api/hello';
  
  const getVisitCount = () => {
    fetch(functionApi)
      .then(response => {
        return response.text()
      })
      .then(response => {
        const count = parseInt(response);
        console.log("Hello, you are visitor number " + count);
        document.getElementById('counter').innerText = count;
      }).catch(function (error) {
        console.log("Failed to fetch visitor count:", error);
      });
    return count;
  }