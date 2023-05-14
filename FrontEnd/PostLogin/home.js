document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded')
});

function loadCustomers(){
    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/data", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            
        })
        .catch(error => console.log('error', error));

}