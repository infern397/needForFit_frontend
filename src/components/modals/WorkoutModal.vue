<!--  <div v-if="workoutData" class="workout-modal" @click.self="$emit('close')">-->
<!--    <div class="workout-modal__form workout-form">-->
<template>
  <base-modal @close="$emit('close')">
    <p class="workout-form__title">{{ workoutData.name }}</p>
    <label for="" class="workout-form__label">Название
      <input class="workout-form__input" v-model="workoutCopy.name"></label>
    <div class="workout__inputs-row">
      <label for="" class="workout-form__label">Дата
        <input v-model="formatedDate" type="date" class="workout-form__input"></label>
      <label for="" class="workout-form__label">Время
        <input v-model="formatedTime" type="time" class="workout-form__input"></label>
    </div>
    <label for="" class="workout-form__label">Категория
      <select v-model="workoutCopy.workout_type.id" class="workout__categories">
        <option :value="category.id" class="workout__category" v-for="category in categories"
                :selected="workoutCopy.workout_type.id === category.id">
          {{ category.name }}
        </option>
      </select>
    </label>

    <div class="workout-form__btns">
      <button class="workout-form__btn" @click="saveWorkout">Сохранить</button>
      <button class="workout-form__btn" @click="deleteWorkout">Удалить</button>
    </div>
  </base-modal>
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import axios from "axios";
import BaseModal from "@/components/modals/BaseModal";
import {mapActions, mapGetters} from 'vuex';


export default {
  name: "WorkoutModal",

  components: {
    BaseModal
  },

  data() {
    return {
      isNewWorkout: true,
      exerciseIndex: null,
      workoutIndex: null,
    };
  },
  props: {
    workoutData: {
      type: Object,
      default: null
    }
  },

  methods: {
    ...mapActions(['fetchCategories']),

    saveWorkout() {
      this.$emit('update-workout', this.workoutCopy);
    },

    deleteWorkout() {
      this.$emit('delete-workout');
    },
    updateCreatedAt(date, time) {
      this.workoutCopy.created_at = `${date}T${time}:00.000000`;
    }
  },
  computed: {
    ...mapGetters(['categories']),
    formatedDate: {
      get() {
        return this.workoutCopy.created_at.split('T')[0];
      },
      set(newDate) {
        this.updateCreatedAt(newDate, this.formatedTime);
      }
    },
    formatedTime: {
      get() {
        return this.workoutCopy.created_at.split('T')[1].slice(0, 5);
      },
      set(newTime) {
        this.updateCreatedAt(this.formatedDate, newTime);
      }
    }
  },
  mounted() {
    this.fetchCategories();

  },
  created() {
    this.workoutCopy = structuredClone(this.workoutData);
    console.log(this.workoutCopy)
  }
}
</script>

<style scoped lang="scss">
.workout-form {
  & * {
    width: 100%;
  }

  &__title {
    line-height: 1;
    text-align: center;
    font-size: 40px;
    margin-bottom: 38px;

    @media (max-width: 768px) {
      margin-bottom: 10px;
      font-size: 30px;
    }
  }

  &__label {
    width: 100%;
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }

  &__input {
    outline: none;
    padding: 0 5px;
    font-size: 36px;
    background-color: #fff;
    border: 1px solid #000000;

    @media (max-width: 768px) {
      font-size: 25px;
    }

    @media (max-width: 425px) {
      //font-size: 20px;
    }
  }

  &__input:focus {
    outline: 1px solid #000000;
  }

  &__btns {
    margin-top: 65px;
    gap: 8px;
    display: flex;
    width: 100%;

    @media (max-width: 768px) {
      margin-top: 15px;
    }

    @media (max-width: 425px) {
      font-size: 22px;
      flex-direction: column;
      gap: 3px;
    }
  }

  &__btn {
    flex: 1 1 0px;
    font-size: 36px;
    border: 1px solid #000000;
    border-radius: 10px;
    width: 100%;

    @media (max-width: 768px) {
      font-size: 22px;
    }
  }
}

.workout {
  &__inputs-row {
    width: 100%;
    display: flex;
    gap: 3px;

    @media (max-width: 425px) {
      flex-direction: column;
    }
  }

  &__categories {
    padding: 0 5px;
    font-size: 36px;
    background-color: #ffffff;
    border: 1px solid #000000;

    @media (max-width: 768px) {
      font-size: 22px;
    }

    &:focus {
      outline: 1px solid #000000;
    }
  }

  &__category {
    border-radius: 0;
  }
}
</style>