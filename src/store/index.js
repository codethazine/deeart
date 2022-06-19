import Vuex from 'vuex'
import { auth } from './auth/auth.js';


export default new Vuex.Store({
  modules: {
    auth, 
  }
})