export const getHeaderJWT = () => ({
    headers:{
        Authorization: "Bearer " + localStorage.getItem("token"), 
        "Content-Type": "application/json"
    }
})

export const callPost = (url = "", data, logged = false) => {
    console.log("Calling url : "+url);
    let toReturn = null;
        let headers = {
            "Content-Type": "application/json"
        }
        if (logged) {
            headers = getHeaderJWT();
        }
        fetch(url, {
            method: "POST",
            body: data,
            headers: headers
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            toReturn = data;
        }).catch((error) => {
            console.log("Error");
        console.error(error);
    });

    return toReturn;
}

export const callGet = (url = "", data, logged = false) => {
    let headers = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    let toReturn = null;
    if (logged) {
        headers = getHeaderJWT();
    }
    fetch(url, {
        method: "GET",
        body: data,
        ...headers
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        toReturn = data;
    }).catch((error) => {
        console.log("Error");
        console.error(error);
    });

    return toReturn;
}