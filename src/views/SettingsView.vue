<template>
    <div class="settings-container">
        <div class="form-container">
            <h1>Account Settings</h1>
            <div class="form-group">
                <label class="upper-text">Instagram Username</label>
                <input v-model="AccountSettings.igUsername" type="text" class="form-control" placeholder="opensquare.art">
            </div>
            <div class="form-group">
                <label class="upper-text" style="margin-bottom: 0px;">Instagram Unique ID</label>
                <div>You can get your Instagram Unique ID at the following link:</div>
                <a href="url" target="_blank">https://commentpicker.com/instagram-user-id.php</a>
                <input style="margin-top: 10px;" v-model="AccountSettings.igID" type="text" class="form-control" placeholder="53612203719">
            </div>
            <div class="form-group">
                <label class="upper-text">Wallet address</label>
                <input v-model="AccountSettings.walletAddress" type="text" class="form-control" placeholder="0x118046FFeBEe49a78674BB057A53FA5b48eD1289">
            </div>
            <div class="form-group">
                <label class="upper-text">Default price per NFT in ETH</label>
                <input v-model="AccountSettings.defaultETHPrice" type="number" class="form-control" placeholder="0.2">
            </div>
            <div class="button-container">
                <button type="submit" class="btn btn-primary btn-settings" @click="saveSettings">Save</button>
                <button class="btn btn-light btn-settings" @click="logout">Sign Out</button>
                <div v-if="isSaving" class="loading"></div>
            </div>
            <div style="margin-top: 10px;">{{this.settingsMsg}}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export default {
    data() {
        return {
            AccountSettings: {
                igUsername: "",
                walletAddress: "",
                defaultETHPrice: "",
                igID: "",
            },
            settingsMsg: "",
            isSaving: false,
        }
    },
    async mounted() {
        console.log(this.user)
        if (this.user) {
            let response = await API.graphql(graphqlOperation(queries.listAccountSettings, {
            input: {
                userID: this.user.id,
                }
            }))
            console.log(response)

            // Get last account settings in item by updatedAt
            let accountSettings = response.data.listAccountSettings.items[0]
            if (accountSettings) {
                this.AccountSettings = accountSettings
            }
        }
    },
    methods: {
        async logout() {
        await this.$store.dispatch("auth/logout");
        this.$store.commit("collectionsInfo/setCollections", null);
        this.$router.push("/");
        },
        async saveSettings() {
            console.log(this.user)
            // Check if everything is filled out
            if (this.AccountSettings.igUsername == "" || this.AccountSettings.walletAddress == "" || this.AccountSettings.defaultETHPrice == "") {
                // Show error
                this.settingsMsg = "Please fill out all fields"
                return;
            }

            this.isSaving = true;

            await API.graphql(graphqlOperation(mutations.createAccountSettings, {
                input: {
                    userID: this.user.id,
                    igUniqueID: this.AccountSettings.igID,
                    igUsername: this.AccountSettings.igUsername,
                    walletAddress: this.AccountSettings.walletAddress,
                    defaultETHPrice: this.AccountSettings.defaultETHPrice,
                }
            })).then(response => {
                console.log(response)
                this.settingsMsg = "Settings saved"
                this.isSaving = false;
            }).catch(error => {
                console.log(error)
                this.settingsMsg = "Error saving settings"
                this.isSaving = false;
            })
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
.loading {
  margin-top: 10px;
  border: 6.8px solid #f3f3f3; /* Light grey */
  border-top: 6.8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


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

