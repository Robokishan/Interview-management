const storage = {
    getToken: () => localStorage.getItem('token'),
    setToken: (value: any) => {
        localStorage.setItem('token', value);
    },
    saveUserId: (value: any) => {
        localStorage.setItem('userId', value);
    },
    getUserId: () => localStorage.getItem('userId'),
    removeToken: () => {
        localStorage.removeItem('token');
    },

    saveUser: (value: any) => {
        localStorage.setItem('user', JSON.stringify(value));
    },
    removeUser: () => {
        localStorage.clear();
    },

    getUser: () => JSON.parse(localStorage.getItem('user') || '{}'),

    eraseAllvalues: () => {
        localStorage.clear();
    },

    saveUserDetails: (value: any) => {
        localStorage.setItem('details', JSON.stringify(value));
    },
    getUserDetails: () => JSON.parse(localStorage.getItem('details') || '{}'),
};
export default storage;
