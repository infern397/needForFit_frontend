import axios from '@/axios';

export default {
    state: {
        exercisesList: [],
        typesList: [],
    },
    mutations: {
        SET_EXERCISES_LIST(state, exercisesList) {
            state.exercisesList = exercisesList;
        },
        SET_TYPES_LIST(state, typesList) {
            state.typesList = typesList;
        },
    },
    actions: {
        fetchExercises({commit}) {
            return axios.get('http://127.0.0.1:8000/api/exercises/')
                .then(response => {
                    commit('SET_EXERCISES_LIST', response.data);
                });
        },
        fetchExercisesByType({commit}, typeId) {
            return axios.get(`http://127.0.0.1:8000/api/exercises/${typeId}`)
                .then(response => {
                    commit('SET_EXERCISES_LIST', response.data);
                });
        },
        addExercise({commit}, {eid, wid}) {
            return axios.post('http://127.0.0.1:8000/api/approaches/', {
                eid,
                wid,
                "reps": 0,
                "weight": 0,
                "time": 0
            })
                .then(response => {
                    commit('SET_TYPES_LIST', response.data);
                });
        },
        fetchTypes({commit}) {
            return axios.get('http://127.0.0.1:8000/api/exercises/types_with_ids')
                .then(response => {
                    commit('SET_TYPES_LIST', response.data);
                });
        },
    },
    getters: {
        exercisesList: state => state.exercisesList,
        typesList: state => state.typesList,
    }
};