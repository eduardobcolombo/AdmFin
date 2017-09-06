import Vue from 'vue'
import App from './App.vue'
import Investments from './Components/Investments.vue'
import FixedExpenses from './Components/FixedExpenses.vue'
import MonthlyIncome from './Components/MonthlyIncome.vue'
import AcquisitionCost from './Components/AcquisitionCost.vue'
import Results from './Components/Results.vue'

Vue.component('app-investments', Investments);
Vue.component('app-fixedExpenses', FixedExpenses);
Vue.component('app-monthlyIncome', MonthlyIncome);
Vue.component('app-acquisitionCost', AcquisitionCost);
Vue.component('app-results', Results);

new Vue({
  el: '#app',
  render: h => h(App)
})
