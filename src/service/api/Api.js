export const getHeaderJWT = () => ({
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token"), 
    }
})

export const callPost = async(url = "", data, logged = false) => {
    return new Promise(async (resolve, reject) => {
        console.log("Calling url : "+url);
        let toReturn = [];
        let headers = {
            headers: {
                "Content-Type": "application/json"
            }
        }
    
        if (logged) {
            headers = getHeaderJWT();
        }
        console.log('headers : ');
        console.log(headers);

        toReturn = await fetch(url, {
            method: 'POST',
            ...headers,
            body: data,
        })
        toReturn = await toReturn.json();
        console.log(toReturn);
        resolve(toReturn);
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log("Data ====",data);
        //     resolve(data);
        // }).catch((error) => {
        //     console.log("Error");
        //     console.error(error);
        // });
        // console.log("To return : "+toReturn)

    })
  
}


export const callGet = async (url = "", logged = false) => {
    let headers = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let toReturn = null;
    if (logged) {
        // console.log('Mandalo logged');
        headers = getHeaderJWT();
        // if (localStorage.getItem('token') === 'undefined') {
        //     window.location.href = '/';
        // }
        console.log("headers");
        console.log(headers);
        // console.log(localStorage.getItem("token"));

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

export const callPut = async (url = "", data, logged = false) => {
    console.log("Calling url : "+url);
    console.log("data put : ");
    console.log(JSON.stringify(data));
    let headers = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let toReturn = null;
        if (logged) {
            headers = getHeaderJWT();
            // if (localStorage.getItem('token') === 'undefined') {
            //     window.location.href = '/';
            // }
            console.log('Misy token ');
        }
        console.log(headers);

        await fetch(url, {
            method: 'PUT',
            ...headers,
            body: JSON.stringify(data),
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