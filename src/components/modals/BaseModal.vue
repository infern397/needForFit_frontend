<!-- BaseModal.vue -->
<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-form">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
}
</script>

<style scoped lang="scss">
.modal-form {
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: center;
  padding: 15px 30px;
  background-color: #D9D9D9;
  border: 1px solid #000000;
  border-radius: 10px;
}
</style>