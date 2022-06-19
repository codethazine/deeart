import { Auth } from "aws-amplify";

export const auth = {

    namespaced: true,
    state: { user: null },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }

    },
    actions: {
        async logout({ commit }) {
            commit("setUser", null);
            return await Auth.signOut();
        },
        async login({ commit }, { email, password }) {
            try {
                await Auth.signIn(
                    email,
                    password
                );

                const userInfo = await Auth.currentUserInfo();
                console.log(userInfo);
                commit("setUser", userInfo);
                return Promise.resolve("Success");


            } catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        },
        async loginSocial({ commit }, user ) {
            try {
                commit("setUser", user);
                return Promise.resolve("Success");
            }
            catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        },
        async confirmSignUp(_, { email, code }) {
            try {
                await Auth.confirmSignUp(email, code);
                return Promise.resolve();

            } catch (error) {
                console.log(error);
                return Promise.reject(error);

            }
        },
        async signUp(_, singObj) {
            try {
                let username = "pippo";
                console.log(username, singObj.email, singObj.password);
                await Auth.signUp({
                    username: singObj.email,
                    email: singObj.email,
                    password: singObj.password
                })
                return Promise.resolve();

            } catch (error) {
                console.log(error);
                return Promise.reject(error);

            }
        },
        async forgotPassword(_, { email }) {
            try {
                await Auth.forgotPassword(email);
                return Promise.resolve();
            } catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        },
        async resetPassword(_, { email, code, password }) {
            try {
                console.log(email, code, password)
                await Auth.forgotPasswordSubmit(email, code, password);
                return Promise.resolve();
            } catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        },
        async isAuthenticated() {
            try {
                await Auth.currentAuthenticatedUser();
                console.log("Authenticated");
                return true;
            } catch (error) {
                return false;
            }
        },        
        async authAction({ commit }) {
            try {
                await Auth.currentAuthenticatedUser();
                console.log("Authenticated");
                const userInfo = await Auth.currentUserInfo();
                commit("setUser", userInfo);
                return true;
            } catch (error) {
                return false;
            }
        }

    },
    getters: {
        user: (state) => state.user
    }

}