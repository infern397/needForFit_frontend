import axios from '@/axios';

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
        fetchWorkouts({commit}) {
            const uid = localStorage.getItem('uid');
            return axios.get(`workouts/${uid}`)
                .then(response => {
                    commit('SET_WORKOUTS', response.data);
                })
                .catch(_ => {
                });
        },
        addWorkout({commit}) {
            return axios.post('workouts/',
                {uid: localStorage.getItem('uid')}
            )
                .then(response => {
                    commit('ADD_WORKOUT', response.data);
                });
        },
        updateWorkout({commit}, workoutData) {
            return axios.put(`workouts/${workoutData.id}/`, workoutData)
                .then(response => {
                    commit('UPDATE_WORKOUT', response.data);
                });
        },
        deleteWorkout({commit}, workoutId) {
            console.log(workoutId);
            return axios.delete(`workouts/${workoutId}/`)
                .then(() => {
                    commit('DELETE_WORKOUT', workoutId);
                });
        },
    },
    getters: {
        workouts: state => state.workouts,
    }
};