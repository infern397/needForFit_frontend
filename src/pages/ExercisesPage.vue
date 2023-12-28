<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="exercise in exercisesList" :key="exercise.id"
      >
        <v-card
            @click="addExercise(exercise.id, $route.params.id)"
        >
          <v-card-title>{{ exercise.name }}</v-card-title>
          <v-card-text>{{ exercise.description }}</v-card-text>
          <v-card-item>
            <v-img :src="exercise.image"></v-img>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "ExercisesPage",
  data: function () {
    return {
      exercisesList: [],
      loading: false,
    }
  },
  methods: {
    getExercises() {
      this.loading = true;
      axios.get('http://127.0.0.1:8000/api/exercises/')
          .then(res => {
            this.exercisesList = res.data;
            console.log(res.data)
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          })
    },
    addExercise(eid, wid) {
      console.log(eid);
      this.loading = true;
      axios.post('http://127.0.0.1:8000/api/approaches/',
          {
            eid,
            wid,
            "reps": 0,
            "weight": 0,
            "time": 0
          })
          .then(res => {
            this.$router.push({name: 'workout', params: {id: wid}});
          })
          .catch(err => {
            console.log(err);
          })
    }
  },
  mounted() {
    this.getExercises()
  }
}
</script>

<style scoped>

</style>