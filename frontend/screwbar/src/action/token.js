const TOKEN = 'token';
const token = {
    saveToken(token) {
        localStorage.setItem(TOKEN, token);
    },
    getToken() {
        return localStorage.getItem(TOKEN);
    },
    clearToken() {
        localStorage.clear();
    }
}

export default token;