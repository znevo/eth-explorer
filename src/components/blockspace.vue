<template>
  <progress
    :class="
      utilization >= 75
        ? 'is-danger'
        : utilization <= 25
          ? 'is-warning'
          : 'is-success'
    "
    class="progress is-info is-small"
    v-bind:value="utilization"
    max="100"
    style="max-width: 200px;"
  ></progress>
</template>

<script>
export default {
  name: 'blockspace',
  props: {
    utilization: Number
  }
}
</script>
