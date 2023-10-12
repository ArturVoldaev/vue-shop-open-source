<template>
  <div class="product__counter form__counter">
    <button
      @click.prevent="removeFromCart"
      type="button"
      aria-label="Убрать один товар"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount" name="count" />

    <button
      @click.prevent="addToCart"
      type="button"
      aria-label="Добавить один товар"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["item"],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch("updateCartProductAmount", {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapMutations({
      deleteProduct: "deleteCartProduct",
      addProductToCartDetal: "addProductToCart",

    }),
    addToCart() {
      this.amount++;
    },
    removeFromCart() {
      if (this.amount > 0) {
        this.amount--;
      }
    },
  },
};
</script>
