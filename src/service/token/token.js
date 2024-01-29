let saveToken = (token) => {
    localStorage.setItem('token', token);
}

let logout = () => {
    localStorage.removeItem('token');
}

let isLoggedIn = () => {
    let token = localStorage.getItem('token');
    return !!token
}

export const token = {
    saveToken, logout, isLoggedIn
}
