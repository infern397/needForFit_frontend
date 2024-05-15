<template>
    <base-modal @close="$emit('close')">
      <p class="approach-form__title">Жим лёжа</p>
      <label for="" class="approach-form__label">Повторения
        <input type="number" v-model="approachCopy.reps" class="approach-form__input" @input="v$.approachCopy.reps.$touch">
        <span v-if="v$.approachCopy.reps.$dirty">
          <span v-if="v$.approachCopy.reps.required.$invalid" class="error">Поле обязательно для заполнения</span>
          <span v-if="v$.approachCopy.reps.minValue.$invalid" class="error">Значение должно быть больше 1</span>
          <span v-if="v$.approachCopy.reps.maxValue.$invalid" class="error">Значение должно быть меньше 1000</span>
        </span>
      </label>
      <label for="" class="approach-form__label">Вес
        <input type="number" v-model="approachCopy.weight" class="approach-form__input" @input="v$.approachCopy.weight.$touch">
        <span v-if="v$.approachCopy.weight.$dirty">
          <span v-if="v$.approachCopy.weight.required.$invalid" class="error">Поле обязательно для заполнения</span>
          <span v-if="v$.approachCopy.weight.minValue.$invalid" class="error">Значение должно быть больше 1</span>
          <span v-if="v$.approachCopy.weight.maxValue.$invalid" class="error">Значение должно быть меньше 1000</span>
        </span>
      </label>

      <div class="approach-form__btns">
        <button class="approach-form__btn" @click="saveApproach">Сохранить</button>
        <button class="approach-form__btn" @click="deleteApproach">Удалить</button>
      </div>
    </base-modal>
</template>

<script>
import BaseModal from "@/components/modals/BaseModal";
import { required, minValue, maxValue } from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core/dist";

export default {
  name: "ApproachModal",
  components: {
    BaseModal
  },
  data() {
    return {
      reps: null,
      weight: null,
      isNewApproach: true,
      approachCopy: {
        reps: 0,
        weight: 0
      }
    };
  },

  setup() {
    return {v$: useVuelidate()}
  },

  created() {
    this.approachCopy = structuredClone(this.approachData);
    this.isNewApproach = !this.approachCopy.id;
  },

  props: {
    approachData: {
      type: Object,
      default: null
    },
    exerciseIndex: {
      type: Number,
    },
    approachIndex: {
      type: Number,
      default: null
    }
  },

  methods: {
    clearForm() {
      this.reps = null;
      this.weight = null;
    },

    saveApproach() {
      if (this.isNewApproach) {
        const approach = {
          reps: this.approachCopy.reps,
          weight: this.approachCopy.weight
        };
        this.$emit('save-approach', approach, this.exerciseIndex);
        this.clearForm();
      } else {
        this.updateApproach()
      }
    },

    updateApproach() {
      this.$emit('update-approach', this.approachCopy);
    },

    deleteApproach() {
      // Логика удаления подхода
      this.$emit('delete-approach', this.approachCopy);
    }
  },
  validations() {
    return {
      approachCopy: {
        reps: { required, minValue: minValue(1), maxValue: maxValue(1000) },
        weight: { required, minValue: minValue(1), maxValue: maxValue(1000) }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.approach-form {
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 80px 20px;
  background-color: #D9D9D9;
  border-radius: 10px;

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
</style>