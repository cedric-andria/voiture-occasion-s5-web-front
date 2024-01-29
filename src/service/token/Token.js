let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let logout = () => {
    localStorage.removeItem('token');
}

export let isLoggedIn = () => {
    let token = localStorage.getItem('token');
    return !!token
}

export const token = {
    saveToken, logout, isLoggedIn
}
