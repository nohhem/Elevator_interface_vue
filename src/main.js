import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false
// var vm = new Vue({
//   el: '#app',

//   components: {"ElevatorPanel": ElevatorPanel}

// });

new Vue({
  render: h => h(App),
}).$mount('#app')
