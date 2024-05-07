import axios from '@/axios';


export default {
    state: {
        categories: [],
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        ADD_CATEGORY(state, category) {
            state.categories.push(category);
        },
        UPDATE_CATEGORY(state, updatedCategory) {
            const index = state.categories.findIndex(category => category.id === updatedCategory.id);
            if (index !== -1) {
                state.categories.splice(index, 1, updatedCategory);
            }
        },
        DELETE_CATEGORY(state, categoryId) {
            state.categories = state.categories.filter(category => category.id !== categoryId);
        },
    },
    actions: {
        fetchCategories({ commit }) {
            return axios.get(`http://127.0.0.1:8000/api/workouts/types/${localStorage.getItem('uid')}`)
                .then(response => {
                    commit('SET_CATEGORIES', response.data);
                });
        },
        addCategory({ commit }, categoryData) {
            console.log(categoryData)
            return axios.post('http://127.0.0.1:8000/api/workouts/types/', categoryData)
                .then(response => {
                    commit('ADD_CATEGORY', response.data);
                });
        },
        updateCategory({ commit }, categoryData) {
            return axios.put(`http://127.0.0.1:8000/api/workouts/types/${categoryData.id}/`, categoryData)
                .then(response => {
                    commit('UPDATE_CATEGORY', response.data);
                });
        },
        deleteCategory({ commit }, categoryId) {
            console.log(categoryId);
            return axios.delete(`http://127.0.0.1:8000/api/workouts/types/${categoryId}/`)
                .then(() => {
                    commit('DELETE_CATEGORY', categoryId);
                });
        },
    },
    getters: {
        categories: state => state.categories,
    }
};