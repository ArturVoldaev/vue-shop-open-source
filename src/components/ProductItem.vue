<template>
  <div>
    <router-link
      :to="{ name: 'product', params: { id: product.id } }"
      class="catalog__pic"
    >
      <img :src="product.image" :alt="product.title" />
    </router-link>
    <h3 class="catalog__title">
      <router-link :to="{ name: 'product', params: { id: product.id } }">
        {{ product.title }}
      </router-link>
    </h3>
    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="item in product.colors" :key="item.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="item.id"
            v-model="color"
          >
          <span class="colors__value" :style="{'background-color': item.code}"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";

export default {
  props: ["product"],
  filters: {
    numberFormat,
  },
  data() {
    return {
      color: this.product.colors[0].id,
    };
  }, 
};
</script>
