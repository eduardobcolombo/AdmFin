import Vue from 'vue'
import App from './App.vue'
import Investments from './Investments.vue'
import FixedExpenses from './FixedExpenses.vue'
import MonthlyIncome from './MonthlyIncome.vue'
import AcquisitionCost from './AcquisitionCost.vue'

Vue.component('app-investments', Investments);
Vue.component('app-fixedExpenses', FixedExpenses);
Vue.component('app-monthlyIncome', MonthlyIncome);
Vue.component('app-acquisitionCost', AcquisitionCost);

new Vue({
  el: '#app',
  render: h => h(App)
})
