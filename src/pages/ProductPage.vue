<template>
  <div>
    <main class="content container" v-if="productsLoading">
      <img
        class="preloaderLogo"
        v-if="productsLoading"
        src="@/assets/Spinner-2.gif"
      />
    </main>
    <main class="content container" v-else-if="!productsData">
      Произошла ошибка, при загрузке товаров...
      <button type="button" @click.prevent="loadProducts">
        Пробовать еще раз
      </button>
    </main>
    <main v-else class="content container">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> {{ products.title }} </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img
              width="570"
              height="570"
              :src="products.image.file.url"
              :alt="products.title"
            />
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ products.id }}</span>
          <h2 class="item__title">{{ products.title }}</h2>
          <div class="item__form">
            <form
              class="form"
              action="#"
              method="POST"
              @submit.prevent="addToCart"
            >
              <b class="item__price"> {{ products.price | numberFormat }} ₽ </b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>
                <ul class="colors">
                  <li v-for="code in colors" :key="code.id" class="colors__item">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        :value="colors.title"
                        :checked="colors[0].id === code.id"
                      />
                      <span
                        class="colors__value"
                        :style="{'background-color': code.code}"
                      >
                      </span>
                    </label>
                  </li>

                </ul>
              </fieldset>

              <div class="item__row">
                <div class="form__counter">
                  <button
                    @click.prevent="productAmount > 0 ? productAmount-- : false"
                    type="button"
                    aria-label="Убрать один товар"
                  >
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-minus"></use>
                    </svg>
                  </button>

                  <input type="text" name="count" v-model="productAmount" />

                  <button
                    @click.prevent="productAmount++"
                    type="button"
                    aria-label="Добавить один товар"
                  >
                    <svg width="12" height="12" fill="currentColor">
                      <use xlink:href="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
                <button class="button button--primery" type="submit" :disabled="productAddSending">
                  В корзину
                </button>
              </div>
              <div v-show="productAdded">Товар добавлен в корзину</div>
              <div v-show="productAddSending">Добавление товара в корзину</div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { API_BASE_URL } from "@/const";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: ["pageParams"],

  data() {
    return {
      productAmount: 1,
      productsData: null,
      productsLoading: false,
      productsLoadingFaled: false,

      productAdded: false,
      productAddSending: false
    };
  },
  computed: {
    products() {
      return this.productsData;
    },
    category() {
      return this.productsData.category;
    },
    colors() {
      return this.productsData.colors;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({
        productId: this.products.id,
        amount: this.productAmount,
      })
      .then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      })
    },
    loadProduct() {
      this.productsLoading = true;
      this.productsLoadingFaled = false;
      axios
        .get(API_BASE_URL + "/api/products/" + this.$route.params.id)
        .then((response) => (this.productsData = response.data))
        .catch(() => (this.productsLoadingFaled = true))
        .then(() => (this.productsLoading = false));
    },
  },
  filters: {
    numberFormat,
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.loadProduct();
      },
      immediate: true
    },
  },
};
</script>
