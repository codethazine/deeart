<template>
    <div class="settings-container">
        <div class="form-container">
            <h1>Account Settings</h1>
            <div class="form-group">
                <label class="upper-text" for="exampleInputEmail1">Instagram Username</label>
                <input type="text" class="form-control" placeholder="@opensquare.art">
            </div>
            <div class="form-group">
                <label class="upper-text" for="exampleInputEmail1">Wallet address</label>
                <input type="text" class="form-control" placeholder="0x118046FFeBEe49a78674BB057A53FA5b48eD1289">
            </div>
            <div class="form-group">
                <label class="upper-text" for="exampleInputEmail1">Default price per NFT in ETH</label>
                <input type="number" class="form-control" placeholder="0.2">
            </div>
            <label class="upper-text" for="exampleInputEmail1">Select the type of content you'll post.</label>
            <div class="checks-contrainer">
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Photos</label>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Physical Art</label>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Digital Art</label>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Other</label>
                </div>
            </div>
            <div class="button-container">
                <button type="submit" class="btn btn-primary btn-settings" @click="saveSettings">Save</button>
                <button class="btn btn-light btn-settings" @click="logout">Sign Out</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isMobileHeaderOpen: false,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$store.commit("collectionsInfo/setCollections", null);
      this.$router.push("/");
    },
    async saveSettings() {
      await this.$store.dispatch("settings/saveSettings");
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};

</script>

<style scoped>
.settings-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 1280px;
    margin: 10px auto;
}

.upper-text {
    margin-bottom: 10px;
    font-weight: bold;
}

.form-check-label {
    margin-right: 20px;
}

.checks-contrainer {
    display: flex;
    flex-direction: row;
}

.form-container {
    max-width: 772px;
    width: 100%;
}

.form-group {
    margin-bottom: 10px;
}

.btn-settings {
    margin: 0px 10px 0px 0px;
}

</style>

