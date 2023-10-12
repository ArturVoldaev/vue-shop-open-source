<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        @click.prevent="previousPage"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': computedLeftArrow }"
        aria-label="Предыдущая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li
      class="pagination__item"
      v-for="(pageNumber, index) in pages"
      :key="index"
    >
      <a
        href="#"
        @click.prevent="paginate(pageNumber)"
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        @click.prevent="nextPage"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': computedRightArrow }"
        href="#"
        aria-label="Следующая страница"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["page", "count", "perPage"],
  model: {
    prop: "page",
    event: "paginate",
  },
  data() {
    return {
    };
  },
  methods: {
    paginate(page) {
      this.$emit("paginate", page);
    },
    nextPage() {
      return this.page < this.pages ? this.$emit("paginate", this.page + 1) : false;
    },
    previousPage() {
      return this.page > 1 ? this.$emit("paginate", this.page - 1) : false;
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    computedLeftArrow() {
      return this.page == 1 ? true : false
    },
    computedRightArrow() {
      return this.page == this.pages ? true : false
    }
  },
};
</script>
