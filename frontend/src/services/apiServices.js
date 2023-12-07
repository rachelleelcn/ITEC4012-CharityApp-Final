// import Cookies from 'js-cookie';
const API_URL = 'http://127.0.0.1:8000';

export function donate(amount, id) {
    return fetch(`${API_URL}/donate/${id}/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
            }),
        })
}

export function communityDetails(id) {
    return fetch(`${API_URL}/community_details/${id}/`, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export function communityCharities(id) {
    return fetch(`${API_URL}/community_charities/${id}/`, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export function communityComments(id) {
    return fetch(`${API_URL}/community_comments/${id}/`, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export function communityLeave(id) {
    return fetch(`${API_URL}/community_join/${id}/`, {
        method: 'DELETE',
        credentials: 'include',
    })
}

export function communityJoin(id) {
    return fetch(`${API_URL}/community_join/${id}/`, {
        method: 'POST',
        credentials: 'include',
    })
}

export function communityAddComment(newCommentText, id) {
    return fetch(`${API_URL}/community_comments/${id}/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comment: newCommentText,
        }),
    })
        .then(response => response.json())
}


export function accountHistory() {
    return fetch(`${API_URL}/account_history/`, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}


export function accountCommunities() {
    return fetch(`${API_URL}/account_communities/`, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}

export function explore() {
    return fetch(`${API_URL}/explore/`, {
        credentials: 'include',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
}


export function login(username, password) {
    return fetch(`${API_URL}/login/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
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