<template>
  <nav class="header">
    <div class="left-header">
      <router-link style="margin: 0;" to="/"><img class="header-logo" alt="header-logo" src="@/assets/deeart-logo.png"/></router-link>
      <router-link class="typed-logo" to="/">DeeArt</router-link>
    </div>
    <div class="center-header">
        <router-link class="header-link" to="/explore">Explore</router-link>
        <router-link class="header-link" :to="{ path: '/', hash: '#features' }">FAQs</router-link>
        <router-link class="header-link" :to="{ path: '/', hash: '#pricing' }">Pricing</router-link>
    </div>
    <div class="right-header">
        <div v-if="user">
            <router-link to="/account">
                <i class="material-icons">account_circle</i>
            </router-link>
            <router-link to="/settings">
                <i class="material-icons">settings</i>
            </router-link>
        </div>
        <div v-else>
            <div @click="loginWithSocial('Facebook')" style="display: flex; justify-content: space-between;" class="text-center btn btn-dark btn-horiz-social">
                <a href="#" style="display: absolute; color: white; margin-left: 0"><i class="fab fa-facebook"></i></a>
                Facebook
                <a href="#" style="display: absolute; color: transparent; margin-left: 0"><i class="fab fa-facebook"></i></a>
            </div>
        </div>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 70px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 2;
}
.header-logo {
    width: auto;
    height: 35px;
    margin-right: 10px;
}

.left-header {
    display: flex;
    align-items: center;
}

a {
    text-decoration: none;
}

.typed-logo {
    font-size: 1.5em;
    font-weight: bold;
    color: #07111c;
}

.header-link {
    color: #454c55;
    margin-right: 20px;
    font-size: 1em;
    font-weight: bold;
}

i {
    font-size: 2em;
    margin-left: 20px;
    color: #454c55;
}

</style>