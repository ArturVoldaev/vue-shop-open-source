<template>
  <label class="form__label">
    <span class="form__value">{{title}}</span>
    <slot/>
    <span class="form__error" v-if="error">{{error}}</span>
  </label>
</template>

<script>
export default {
    props: ['title', 'error']
}
</script>