<template>
  <div>
    <q-spinner-cube
        color="primary"
        :size="size"
      />
    <p>{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseSpinner',
  props: {
    label: String,
    size: {
      type: String,
      default: '10em'
    }
  }
}
</script>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
