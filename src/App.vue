<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <Header />
  <router-view class="routed-view"/>
  <Footer />
</template>

<style>
#app {
  font-family: "Open Sans", sans-serif;
  font-display: swap;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
}

.routed-view {
  padding: 0 20px 0px 20px;
}

</style>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBar from '@/components/CookieBar'
import { mapActions } from "vuex";


export default {
  name: 'App',
  components: {
    Header, 
    Footer,
    CookieBar,
  },
    mounted() {
    this.authAction();
  },
  methods: {
    ...mapActions("auth", ["authAction"]),
  },
}
</script>

