<template>
  <BaseFormFieldVue :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      v-model="dataValue"
      :type="type"
      :placeholder="placeholder"
    />
  </BaseFormFieldVue>
</template>

<script>
  import formFieldMixin from '@/mixins/formFieldMixin.js';
  export default {
    mixins: [formFieldMixin]
  }
</script>
