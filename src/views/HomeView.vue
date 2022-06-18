<template>
  <div class="home">
    <div class="featured-background-container">
    </div>
    <div class="home-content">
      <div class="content-right">
        <h1>Upload your IG posts as NFTs</h1>
        <p>DeeArt is an automatic one-click solution that automatically converts your Instagram posts into NFTs. 
          <br>Let you followers support your art.
        </p>
        <router-link class="typed-logo" to="/settings">
          <button class="btn btn-primary home-button">Get Started</button>
        </router-link>
        <router-link class="typed-logo" to="/explore">
          <button class="btn btn-light home-button">Explore</button>
        </router-link>
      </div>
      <div class="content-right">
          <!-- TO-DO: Insert explore image -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  height: 83vh;
  padding: 0px 100px;
}
.featured-background-container {
    width: 100%;
    height: 83vh;
    margin-left: -100px;
    margin-right: -100px;
    position: absolute;
    overflow: hidden;
    background-size: cover;
    background-image: url("https://lh3.googleusercontent.com/09N0-Q9MIMm7yGcdLIk7O5p7ZFGb_BgiY8IIV1SjAanirnh-81t39LfKtmGLRm5JmJ3_jTKBBnC9OtEp35aYlyEsyNRIKrdR99Gi4w=s250");
    background-color: rgb(255, 255, 255);
    background-position: center center;
    opacity: 0.3;
    filter: blur(8px);
    --webkit-mask: linear-gradient(rgb(255, 255, 255), transparent);
    z-index: -1;
}
.home-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 83vh;
}

.home-button {
  margin-right: 10px;
}


</style>
