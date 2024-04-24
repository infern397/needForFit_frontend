import axios from 'axios';

export default {
    state: {
        workouts: [],
    },
    mutations: {
        SET_WORKOUTS(state, workouts) {
            state.workouts = workouts;
        },
        ADD_WORKOUT(state, workout) {
            state.workouts.push(workout);
        },
        UPDATE_WORKOUT(state, updatedWorkout) {
            const index = state.workouts.findIndex(workout => workout.id === updatedWorkout.id);
            if (index !== -1) {
                state.workouts.splice(index, 1, updatedWorkout);
            }
        },
        DELETE_WORKOUT(state, workoutId) {
            state.workouts = state.workouts.filter(workout => workout.id !== workoutId);
        },
    },
    actions: {
        fetchWorkouts({ commit }) {
            return axios.get('http://127.0.0.1:8000/api/workouts/1')
                .then(response => {
                    commit('SET_WORKOUTS', response.data);
                });
        },
        addWorkout({ commit }) {
            return axios.post('http://127.0.0.1:8000/api/workouts/',
            { uid: 1}
            )
                .then(response => {
                    commit('ADD_WORKOUT', response.data);
                });
        },
        updateWorkout({ commit }, workoutData) {
            return axios.put(`http://127.0.0.1:8000/api/workouts/${workoutData.id}/`, workoutData)
                .then(response => {
                    commit('UPDATE_WORKOUT', response.data);
                });
        },
        deleteWorkout({ commit }, workoutId) {
            console.log(workoutId);
            return axios.delete(`http://127.0.0.1:8000/api/workouts/${workoutId}/`)
                .then(() => {
                    commit('DELETE_WORKOUT', workoutId);
                });
        },
    },
    getters: {
        workouts: state => state.workouts,
    }
};