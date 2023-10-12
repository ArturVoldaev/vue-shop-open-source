<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> 3 товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormTextVue
              title="ФИО"
              placeholder="Введите ваше полное имя"
              v-model="formData.name"
              :error="formError.name"
            />
            <BaseFormTextVue
              title="Адрес доставки"
              placeholder="Введите ваш адрес"
              v-model="formData.address"
              :error="formError.address"
            />
            <BaseFormTextVue
              type="tel"
              title="Телефон"
              placeholder="Введите ваш телефон"
              v-model="formData.phone"
              :error="formError.phone"
            />
            <BaseFormTextVue
              type="email"
              title="Email"
              placeholder="Введи ваш Email"
              v-model="formData.email"
              :error="formError.email"
            />
            <BaseFormTextAriaVue
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              v-model="formData.comment"
              :error="formError.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li
              v-for="item in products"
              :key="item.productId"
              class="cart__order"
            >
              <h3>{{ item.product.title }}</h3>
              <b>{{ (item.product.price * item.amount) | numberFormat }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>
              Итого: <b>{{ cartTotalAmount }}</b> товара на сумму
              <b>{{ totalPrice | numberFormat }} ₽</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormTextVue from "@/components/BaseFormText.vue";
import BaseFormTextAriaVue from "@/components/BaseFormTextAria.vue";
import { mapGetters } from "vuex";
import numberFormat from "@/helpers/numberFormat";
import axios from "axios";

import { API_BASE_URL } from "@/const";
export default {
  components: {
    BaseFormTextVue,
    BaseFormTextAriaVue,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: "",
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: "cartDetailProducts",
      totalPrice: "cartTotalPrice",
      cartTotalAmount: "cartTotalAmount",
    }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = "";
      axios
        .post(
          API_BASE_URL + "/api/orders",
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          this.$store.commit("resetCart");
          this.$store.commit("updateOrderInfo", response.data);
          this.$router.push({
            name: "orderInfo",
            params: { id: response.data.id },
          });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
};
</script>
