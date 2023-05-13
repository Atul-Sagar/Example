document.addEventListener('DOMContentLoaded', function() {
    alert('Page loaded')
});

function callapi(){
    fetch('http://localhost:3000/data')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        // Process the retrieved data
    })
    .catch(error => {
        console.error('Error:', error);
    });
}