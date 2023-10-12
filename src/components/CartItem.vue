<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>
      <BaseUpDownInput :item="item"/>
    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} ₽
    </b>

    <button
      @click.prevent="removeItemCart(item.product.id)"
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import BaseUpDownInput from "@/components/BaseUpDownInput.vue";
import { mapActions } from "vuex";

export default {
  props: ["item"],
  components: {
    BaseUpDownInput
  },
  filters: {
    numberFormat,
  },
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
    ...mapActions(['deleteCartProduct']),
    removeItemCart(item) {
      this.$store.dispatch("deleteCartProduct", {
        productId: item,
      });
    }
  },
};
</script>
