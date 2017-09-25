import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import VeeValidate, { Validator } from 'vee-validate'
import en from 'vee-validate/dist/locale/en'
import ptBr from 'vee-validate/dist/locale/pt_BR'
import FlagIcon from 'vue-flag-icon'
import App from './App.vue'
import Investments from './Components/Investments.vue'
import FixedExpenses from './Components/FixedExpenses.vue'
import MonthlyIncome from './Components/MonthlyIncome.vue'
import AcquisitionCost from './Components/AcquisitionCost.vue'
import Results from './Components/Results.vue'

Validator.addLocale(en)
Validator.addLocale(ptBr)

Vue.use(Vuetify)
Vue.use(VueI18n)
Vue.use(VeeValidate, {
  locale: window.navigator.language.replace('-', '_') || 'en'
})
Vue.use(FlagIcon)

Vue.component(Investments.name, Investments)
Vue.component(FixedExpenses.name, FixedExpenses)
Vue.component(MonthlyIncome.name, MonthlyIncome)
Vue.component(AcquisitionCost.name, AcquisitionCost)
Vue.component(Results.name, Results)

const i18n = new VueI18n({
  locale: window.navigator.language || 'en',
  fallbackLocale: 'en',
  messages: require('./common/locales/messages.json'),
  // dateTimeFormats: require('./common/locales/dateTimeFormats.json'),
  numberFormats: require('./common/locales/numberFormats.json')
})

new Vue({ // eslint-disable-line no-new
  i18n,
  el: '#app',
  render: h => h(App)
})
