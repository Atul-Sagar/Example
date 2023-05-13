document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded')
});


function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    callapi(username,password)

}


function callapi(username, password){
    let myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    let raw = JSON.stringify({
        "username": username,
        "password": password,
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            alert(result)
        })
        .catch(error => console.log('error', error));
}