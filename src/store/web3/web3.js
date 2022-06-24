import web3Modal from "@/utils/web3";

const cleanData = {
    provider: null,
    library: null,
    account: null,
    chainId: null
}

export const web3 = {
    namespaced: true,
    state: {
        modal: web3Modal,
        data: { ...cleanData },
        error: null
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        },
        setError(state, err) {
            state.error = err;
        }
    },
    actions: {
        async logout({ commit }) {
            commit("setUser", null);
            return await Auth.signOut();
        },
        async connect({ commit, state }) {
            try {
                const provider = await state.modal.connect();
                const library = new ethers.providers.Web3Provider(provider);
                const accounts = await library.listAccounts();
                const network = await library.getNetwork();
                commit('setData', {
                    provider,
                    library,
                    account: accounts[0] || null,
                    chainId: network.chainId
                })
            } catch (error) {
                commit('setError', error.toString());
                console.error(error)
            }
        },
        async disconnect({ commit, state }) {
            try {
                await state.modal.clearCachedProvider();
                commit("setData", {
                    ...cleanData
                });
            }
            catch (error) {
                console.log(error);
                commit('setError', error)
            }
        },
    },
    getters: {
        data: (state) => state.data
    }
}
