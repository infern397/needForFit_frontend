import axios from '@/axios';

export default {
    state: {
        workoutList: [],
    },
    mutations: {
        SET_EXERCISES_LIST(state, workoutList) {
            console.log(workoutList)
            state.workoutList = workoutList;
        },
        ADD_APPROACH(state, approach) {
            console.log(approach)
            const exercise = state.workoutList.find(exercise => exercise.exercise.id === approach.eid);
            exercise.approaches.push(approach)
        },
        REMOVE_APPROACH(state, approach) {
            const exercise = state.workoutList.find(exercise => exercise.exercise.id === approach.eid);
            const approachIndex = exercise.approaches.findIndex(appr => appr.id === approach.id)
            if (approachIndex !== -1) {
                exercise.approaches.splice(approachIndex, 1);
            }
        },
        UPDATE_APPROACH(state, updatedApproach) {
            const exercise = state.workoutList.find(exercise => exercise.exercise.id === updatedApproach.eid);
            const approachIndex = exercise.approaches.findIndex(appr => appr.id === updatedApproach.id)
            if (approachIndex !== -1) {
                exercise.approaches.splice(approachIndex, 1, updatedApproach);
            }
        },
        REMOVE_EXERCISE(state, exerciseId) {
            const exerciseIndex = state.workoutList.findIndex(exercise => exercise.exercise.id === exerciseId);
            if (exerciseIndex !== -1) {
                state.workoutList.splice(exerciseIndex, 1);
            }
        },
    },
    actions: {
        fetchApproaches({commit}, workoutId) {
            return axios.get(`http://127.0.0.1:8000/api/approaches/${workoutId}`)
                .then(response => {
                    commit('SET_EXERCISES_LIST', response.data);
                });
        },
        saveWorkout({}, workoutId) {
            return axios.post(`http://127.0.0.1:8000/api/workouts/${workoutId}`);
        },
        removeExercise({commit}, {wid, eid}) {
            return axios.delete(`http://127.0.0.1:8000/api/approaches/${wid}/${eid}`)
                .then(response => {
                    commit('REMOVE_EXERCISE', eid);
                });
        },
        addApproach({commit}, {eid, wid, reps, weight}) {
            return axios.post('http://127.0.0.1:8000/api/approaches/', {
                eid,
                wid,
                reps,
                weight,
                "time": 0
            })
                .then(response => {
                    commit('ADD_APPROACH', response.data);
                });
        },
        updateApproach({commit}, approach) {
            return axios.put(`http://127.0.0.1:8000/api/approaches/${approach.id}`, approach)
                .then(res => {
                    commit('UPDATE_APPROACH', res.data);
                });
        },
        removeApproach({commit}, approachId) {
            return axios.delete(`http://127.0.0.1:8000/api/approaches/${approachId}`)
                .then((res) => {

                    commit('REMOVE_APPROACH', res.data);
                });
        },
    },
    getters: {
        workoutList: state => state.workoutList,
    }
};