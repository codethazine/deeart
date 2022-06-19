<template>
    <div class="settings-container">
        <div class="form-container">
            <h1>Account Settings</h1>
            <div class="form-group">
                <label class="upper-text" for="exampleInputEmail1">Instagram Username</label>
                <input v-model="AccountSettings.igUsername" type="text" class="form-control" placeholder="@opensquare.art">
            </div>
            <div class="form-group">
                <label class="upper-text" for="exampleInputEmail1">Wallet address</label>
                <input v-model="AccountSettings.walletAddress" type="text" class="form-control" placeholder="0x118046FFeBEe49a78674BB057A53FA5b48eD1289">
            </div>
            <div class="form-group">
                <label class="upper-text" for="exampleInputEmail1">Default price per NFT in ETH</label>
                <input v-model="AccountSettings.defaultETHPrice" type="number" class="form-control" placeholder="0.2">
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
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export default {
    data() {
        return {
            AccountSettings: {
                igUsername: "",
                walletAddress: "",
                defaultETHPrice: ""
            },
        }
    },
    async mounted() {
        /*
        // Wait till this.user is set 
        let response = await API.graphql(graphqlOperation(queries.listAccountSettings, {
            input: {
                userID: this.user.id,
            }
        }))
        console.log(response)
            
        this.AccountSettings = response.data.listAccountSettings.item;
        */
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
                console.log("Please fill out all fields")
                return;
            }

            await API.graphql(graphqlOperation(mutations.createAccountSettings, {
                input: {
                    userID: this.user.id,
                    igUsername: this.AccountSettings.igUsername,
                    walletAddress: this.AccountSettings.walletAddress,
                    defaultETHPrice: this.AccountSettings.defaultETHPrice,
                }
            })).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
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

