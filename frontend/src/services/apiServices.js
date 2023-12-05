// import Cookies from 'js-cookie';
const API_URL = 'http://127.0.0.1:8000';

export function login(username, password) {
    return fetch(`${API_URL}/login/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid login credentials');
                } else {
                    throw new Error('Login failed with status: ' + response.status);
                }
            }
            return response.json();
        });
}

export function logout() {
    return fetch(`${API_URL}/logout/`, {
        method: 'POST',
        credentials: 'include', // Include for session management
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            return response.ok;
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
}