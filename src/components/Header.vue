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
            <div @click="loginWithSocial('Facebook')" class="btn btn-primary btn-horiz-social">
                <a href="#" style="color: white; margin-left: 0"><i style="color: white; margin-left: 0; margin-right: 10px; font-size: 25px;" class="fab fa-facebook"></i></a>
                Login with Facebook
            </div>
        </div>
        <div>
            <button
                class="btn connect-btn"
                v-if="!data.account"
                @click="connect()"
            >
                Connect Wallet
            </button>
            <button
                class="btn disconnect-btn"
                v-if="data.account"
                @click="disconnect()"
            >
                {{data.account}}
            </button>
        </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from 'vuex';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import web3Modal from '..//utils/web3';


// @ is an alias to /src
export default {
    name: 'Header',
    components: {},
    methods: {
        ...mapActions({
            loginVue: "auth/login",
            loginSocial: "auth/loginSocial",
            connectWallet: "web3/connect",
            diconnectWallet: "web3/disconnect"
        }),
        async loginWithSocial(social) {
            if (social === "Google") {
                user = await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })
                //await this.loginSocial(user);
            }
            else if (social === "Facebook") {
                user = await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook })
                //await this.loginSocial(user);
            }
        },
        async connect() {
            await this.connectWallet();
        },
        async disconnect() {
            await this.disconnectWallet();
        }
    },
    computed: {
    ...mapGetters({
        user: "auth/user",
        data: "web3/data"
        }),
    },
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

.btn-horiz-social {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
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

.connect-btn {
    background-color: #1CAC78;
}

.disconnect-btn {
    background-color: #008080;
}

</style>
