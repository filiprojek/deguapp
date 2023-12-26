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
    <button type="button" class="btn" @click="showModal">
      Open Modal!
    </button>
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    >
      <template #header>
        <h1>Tohle Je Muj Header</h1>
      </template>
    </Modal>
  </main>

  <!-- <footer>
    <a href="https://git.filiprojek.cz/fr/deguapp">Source</a>
    <a href="http://filiprojek.cz/">(c) Filip Rojek, 2023</a>
  </footer> -->
</template>

<script>
  import Modal from './components/Modal.vue';
  export default {
    name: 'App',
    components: {
      Modal,
    },
    data() {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
  };
</script>

<style scoped></style>
