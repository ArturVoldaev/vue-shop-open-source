import BaseFormFieldVue from "@/components/BaseFormField.vue";

export default {
  components: { BaseFormFieldVue },
  props: {
    title: String,
    error: String,
    placeholder: String,
    value: String,
    type: {
      default: "text",
    },
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
