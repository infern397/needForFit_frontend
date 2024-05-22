<template>
  <base-modal @close="$emit('close')">
    <h2 class="modal-form__title">{{ mode === 'create' ? 'Установить цитату' : 'Изменить цитату' }}</h2>
    <label class="modal-form__label">текст
      <textarea class="modal-form__input" v-model="phrase.name" @input="v$.phrase.name.$touch"> </textarea>
      <span v-if="v$.phrase.name.$dirty">
        <span v-if="v$.phrase.name.required.$invalid" class="error">Поле обязательно для заполнения</span>
        <span v-if="v$.phrase.name.maxLength.$invalid" class="error">Значение должно быть не более 200 символов</span>
      </span>
    </label>
    <div class="modal-form__btns">
      <button @click="" class="modal-form__btn">{{ mode === 'create' ? 'Добавить' : 'Изменить' }}</button>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "@/components/modals/BaseModal";
import { required, maxLength } from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core/dist";

export default {
  name: "PhraseModal",
  components: {
    BaseModal
  },

  props: {
  },

  data() {
    return {
      phrase: {
        name: ''
      },
      mode: 'create'
    }
  },

  setup() {
    return {v$: useVuelidate()}
  },

  created() {

  },

  methods: {

  },

  validations() {
    return {
      phrase: {
        name: { required, maxLength: maxLength(200) }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.modal-form {
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