<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a
            class="breadcrumbs__link"
            href="#"
            @click.prevent="goToPage('main')"
          >
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> 404 </a>
        </li>
      </ul>
    </div>
    <h1>Страница не найдена</h1>
    <h2>
      Чтобы вернуться на главную страницу сайта перейдите по
      <router-link class="linkBack" :to="{ name: 'main' }">
        ссылке
      </router-link>
    </h2>
  </main>
</template>

<script>
export default {};
</script>

<style>
.linkBack {
  text-decoration: underline;
  color: chocolate;
}
</style>
