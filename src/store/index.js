import Vue from 'vue';
import Vuex from 'vuex';
import workouts from './modules/workouts';
import categories from './modules/categories';
import exercises from './modules/exercises';
import workout from './modules/workout';
import phrases from './modules/phrases';

export default new Vuex.Store({
    modules: {
        workouts,
        categories,
        exercises,
        workout,
        phrases,
    }
});