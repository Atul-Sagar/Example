document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded')
});

function loadCustomers(){
    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/data", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
           handleResponse(result)

        })
        .catch(error => console.log('error', error));

}

function handleResponse(JSONString){
    let json = JSON.parse(JSONString)
    let container;
    container = document.createElement("div");
    for (let index = 0; index < json.length; index++) {
        console.log(json[index]);

        // let body = document.getElementsByName("body");

        let div;
        
        container.setAttribute("class","container-div")
        div = document.createElement("div");
        div.setAttribute("class", "card-div")
        let pid, pname, pcity;
        pid = document.createElement("p")
        pname = document.createElement("p")
        pcity = document.createElement("p")
        pid.innerText = "ID : "+json[index].id
        div.appendChild(pid)
        pname.innerText ="Name :"+json[index].name
        div.appendChild(pname)
        pcity.innerText ="City : "+json[index].city
        div.appendChild(pcity)
        container.appendChild(div)
        document.body.append(container)

        
    }
}