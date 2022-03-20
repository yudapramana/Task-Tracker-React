// const urlProd = 'http://localhost:3000/api'
// const urlProd = 'https://cors-anywhere.herokuapp.com/https://api-techtruction.herokuapp.com/api'
const urlProd = 'https://api-techtruction.herokuapp.com/api'

export function getItems() {
    return fetch(`${urlProd}/tasks`, {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then(data => data.json())
}

export function getItem(id) {
    return fetch(`${urlProd}/tasks/${id}`, {
            method: 'GET',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then(data => data.json())
}

export function setItem(item) {
    return fetch(`${urlProd}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(item),
        })
        .then(data => data.json())
}

export function deleteItem(id) {
    return fetch(`${urlProd}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then(data => data.json())
}

export function updateItem(id, data) {
    return fetch(`${urlProd}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')

            },
            body: JSON.stringify(data),
        })
        .then(data => data.json())
}

export function login(user) {
    console.log(user);
    return fetch(`${urlProd}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(data => data.json())
}