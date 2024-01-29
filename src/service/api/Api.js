export const getHeaderJWT = () => ({
    headers:{
        Authorization: "Bearer " + localStorage.getItem("token"), 
        "Content-Type": "application/json"
    }
})

export const callPost = async(url = "", data, logged = false) => {
    return new Promise(async (resolve, reject) => {
        console.log("Calling url : "+url);
        let toReturn = [];
        let headers = {
            "Content-Type": "application/json"
        }
        if (logged) {
            headers = getHeaderJWT();
        }
        toReturn = await fetch(url, {
            method: "POST",
            body: data,
            headers: headers
        })
        toReturn = await toReturn.json()
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