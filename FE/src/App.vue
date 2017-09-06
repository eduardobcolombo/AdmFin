<template>
  <div id="app">
    <h1>{{ msg }}</h1>


    <app-investments @total_investments_change="total.investments = $event"></app-investments>
    <hr />
    <app-fixedExpenses @total_fixedExpenses_change="total.fixedExpenses = $event"></app-fixedExpenses>
    <hr />
    <app-monthlyIncome @total_montlyCost_change="total.montlyCost = $event" @total_montlyIncome_change="total.montlyIncome = $event"></app-monthlyIncome>
    <hr />
    <app-acquisitionCost @total_acquisitionCost_change="total.acquisitionCost = $event"></app-acquisitionCost>
    <hr />
    <app-results :total="total"></app-results>
    <hr />


  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Make sure is good idea buy or create a business!',
      total: {
        investments: 0,
        fixedExpenses: 0,
        montlyCost: 0,
        montlyIncome: 0,
        acquisitionCost: 0

      },
    }
  }
}
</script>
