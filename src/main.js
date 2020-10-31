import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './assets/reset.css';
import * as VeeValidate from 'vee-validate';


// Vue.use(router);
Vue.config.productionTip = false;
// Vue.use(VeeValidate, {inject: false});
Vue.use(VeeValidate, {inject: true});


new Vue({
  router,
  store,
  vuetify,
  $_veeValidate: {
    validator: 'new'
  },
  render: (h) => h(App),
}).$mount('#app');
