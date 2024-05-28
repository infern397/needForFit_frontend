<template>
  <base-modal @close="$emit('close')">
    <iframe class="exercise__video" width="100%" :src="exerciseData.video_url"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <div class="exercise__descr">
      <p class="exercise__title">{{ exerciseData.name }}</p>
      <p class="exercise__text">{{
          exerciseData.description
        }}</p>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "@/components/modals/BaseModal";
import {required, minValue, maxValue} from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core/dist";

export default {
  name: "ApproachModal",
  components: {
    BaseModal
  },
  data() {
    return {};
  },

  setup() {

  },

  created() {

  },

  props: {
    exerciseData: {
      type: Object,
      default: null
    }
  },

  methods: {},
  validations() {

  }
}
</script>

<style scoped lang="scss">


.exercise {
  &__video {
    height: 300px;
    aspect-ratio: 16/9;
    @media (max-width: 768px) {
      height: 180px;
    }
    @media (max-width: 160px) {
      max-width: 90%;
      gap: 5px;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 20px;
  }


}
</style>