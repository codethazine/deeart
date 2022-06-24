import Vuex from 'vuex'
import { auth } from './auth/auth.js';
import { web3 } from './web3/web3.js';


export default new Vuex.Store({
  modules: {
    auth,
    web3
  }
})
