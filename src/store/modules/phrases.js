import axios from '@/axios';


export default {
    state: {
        phrase: '',
    },
    mutations: {
        SET_PHRASE(state, phrase) {
            state.phrase = phrase;
        },
    },
    actions: {
        fetchPhrase({ commit }) {
            return axios.get(`phrases/${localStorage.getItem('uid') ?? 0}`)
                .then(response => {
                    commit('SET_PHRASE', response.data);
                })

        },
        createPhrase({ commit }, text) {
            return axios.post('phrases/', {phrase: text, uid: localStorage.getItem('uid')})
                .then(response => {
                    commit('SET_PHRASE', response.data);
                });
        },
        updatePhrase({ commit }, text) {
            return axios.put(`phrases/${localStorage.getItem('uid')}`, {phrase: text})
                .then(response => {
                    commit('SET_PHRASE', response.data);
                });
        },
        deletePhrase({ dispatch }) {
            return axios.delete(`phrases/${localStorage.getItem('uid')}`)
                .then(() => {
                    dispatch('fetchPhrase');
                });
        },
    },
    getters: {
        phrase: state => state.phrase,
    }
};