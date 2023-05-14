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
            // alert(result)
            
            if(JSON.parse(result).message == 'Login successful'){
                location.href='./PostLogin/home.html'

            }else if(JSON.parse(result).message == 'Invalid credentials'){
                alert("Invalid credentials, Try Again")
            }else{
                alert("Something went wrong")
            }
        })
        .catch(error => console.log('error', error));
}

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });