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
            headers: {"Content-Type": "application/json",
        }
    };
        if (logged) {
            headers = getHeaderJWT();
        }
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                ...headers
            }
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

export const callGet = async (url = "", logged = false) => {
    let headers = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    let toReturn = null;
    if (logged) {
        console.log('Mandalo logged');
        headers = getHeaderJWT();
    }
    await fetch(url, {
        method: 'GET',
        ...headers
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("data API : ");
        console.log(data);
        toReturn = data;
    }).catch((error) => {
        console.log("Error");
        console.error(error);
    });

    return toReturn;
}

export const callPut = (url = "", data, logged = false) => {
    console.log("Calling url : "+url);
    console.log("data put : ");
    // console.log(JSON.stringify(data));
    let headers = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    let toReturn = null;
        if (logged) {
            // headers = getHeaderJWT();
        }
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
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