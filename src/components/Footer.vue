<template>
    <nav class="footer" id="myfooter">
    <div class="footer-line" style="background-color: #e8e9eb; width: 100%; height: 1px; margin-top: 3rem; margin-left: auto; margin-right: auto;"></div>   
    <div class="center-div-footer">
        <router-link to="/terms-of-service">Terms of Service</router-link>
        <router-link to="/privacy-policy">Privacy Policy</router-link>
    </div> 
    <a class="support-email" href="mailto:hello@deeart.io">hello@deeart.io</a> 
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>

.footer {
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  font-size: 1em;
  font-weight: bold;
  color: black;
  position: relative;
  bottom: 0;
  margin-top: auto;
  width: 95%;
  margin-left: auto; 
  margin-right: auto;
}

.footer a {
  text-decoration: none;
  color: #07111c;
  margin: 0 10px;
}

.center-div-footer {
    -webkit-box-flex: 3;
    -ms-flex-positive: 3;
    flex-grow: 3;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
}

.support-email {
  position: absolute; 
  top: 60%; 
  right: 1.1%; 
  font-weight: normal; 
  font-size: 0.8rem;
}

@media screen and (max-width: 1000px) {
    .support-email {
        display: none;
    }
}


</style>