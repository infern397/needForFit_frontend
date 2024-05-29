import axios from '@/axios';

export default {
    state: {
        user: {
            id: null,
            login: null,
            password: null,
            profile_picture: null
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setLogin(state, login) {
            state.user.login = login;
        },
        setPassword(state, password) {
            state.user.password = password;
        },
        setAvatar(state, avatar) {
            state.user.profile_picture = avatar;
        }
    },
    actions: {
        fetchUser({ commit },) {
            axios.get(`users/${localStorage.getItem('uid')}`)
                .then(response => {
                    commit('setUser', response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },

        updateLogin({ commit }, { newLogin }) {
            axios.post(`users/${localStorage.getItem('uid')}/login/change`, { new_login: newLogin })
                .then(response => {
                    commit('setLogin', response.data.username);
                })
                .catch(error => {
                    console.error(error);
                });
        },

        updatePassword({ commit }, { oldPassword, newPassword }) {
            axios.post(`users/${localStorage.getItem('uid')}/password/change`, { old_password: oldPassword, new_password: newPassword })
                .then(response => {
                    commit('setPassword', response.data.password);
                })
                .catch(error => {
                    console.error(error);
                });
        },

        updateAvatar({ commit }, avatar) {
            const formData = new FormData();
            formData.append('file', avatar);
            axios.post(`users/${localStorage.getItem('uid')}/picture/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    commit('setAvatar', response.data.profile_picture);
                })
                .catch(error => {
                    console.error(error);
                });
        },

        deleteAvatar({ commit }) {
            axios.delete(`users/${localStorage.getItem('uid')}/picture/delete`)
                .then(response => {
                    commit('setAvatar', response.data.profile_picture);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    }
};