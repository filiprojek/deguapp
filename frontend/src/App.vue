<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="nav-left">
      <RouterLink to="/">
        <!-- <img src="/img/icons/beer.svg" alt="degu app home"> -->
        <span>Degu App</span>
      </RouterLink>
    </div>
    <div class="nav-right">
      <div class="nav-item nav-add">
        <!-- <img src="/img/icons/plus.svg" alt="add beer or review"> -->
        +
      </div>
      <div class="nav-item nav-user">
        <!-- <img src="/img/icons/user.svg" alt="user icon"> -->
        <a href="#">Test Testovic</a>
      </div>
    </div>
  </header>

  <main class="content">
    <RouterView />
  </main>

  <!-- <footer>
    <a href="https://git.filiprojek.cz/fr/deguapp">Source</a>
    <a href="http://filiprojek.cz/">(c) Filip Rojek, 2023</a>
  </footer> -->
</template>

<style scoped></style>
