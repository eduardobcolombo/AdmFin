<template>
  <div class="pl-1 pr-1" id="results">
    <!--TODO: translate much better  -->

    <v-layout row wrap>
      <v-flex sm12 md12 lg12 xl6 mb-4 xl-pr-2>
        <ol class="results">
          <li>
            Monthly income
            <strong class="right">{{ $n(results.monthlyIncome, 'currency') }}</strong>
          </li>
          <li>
            Float cost
            <strong class="right">{{ $n(results.floatCost, 'currency') }}</strong>
            <ol class="results">
              <li>
                Cost of produts
                <span class="right">{{ $n(results.costProducts, 'currency') }}</span>
              </li>
              <li>
                Acquisition cost (impostos, comissões, ...)
                <span class="right">
                  ({{ $n(results.percentAcquisitionCost, 'percent') }})
                  {{ $n(results.acquisitionCost, 'currency') }}
                </span>
              </li>
            </ol>
          </li>
          <li>
            Contribution margin
            <strong class="right">{{ $n(results.contributionMargin, 'currency') }}</strong>
          </li>
          <li>
            Fixed expenses
            <strong class="right">{{ $n(results.fixedExpenses, 'currency') }}</strong>
          </li>
          <li>
            Operational result
            <strong class="right">{{ $n(results.operationalResult, 'currency') }}</strong>
          </li>
          <li>
            Net profit
            <strong class="right"> {{ $n(results.netProfit, 'currency') }}</strong>
          </li>
          <li>
            Break-even point
            <strong class="right">{{ $n(results.breakEvenPoint, 'currency') }}</strong>
          </li>
        </ol>
      </v-flex>
      <v-flex sm12 md12 lg12 xl6 xl-pr-2>
        <ul class="economicIndex">
          <li>
            Margem de contribuição
            <strong class="right">{{ $n(economicIndex.contributionMargin, 'percent') }}</strong>
          </li>
          <li>
            Lucratividade das vendas
            <strong class="right">{{ $n(economicIndex.salesProfitability, 'percent') }}</strong>
          </li>
          <li>
            Ponto de equilíbrio
            <strong class="right">{{ $n(economicIndex.breakEvenPoint, 'currency') }}</strong>
          </li>
          <li>
            Rentabilidade do projeto (a.m.)
            <strong class="right">{{ $n(economicIndex.projectProfitabilityMonth, 'percent') }}</strong>
          </li>
          <li>
            Rentabilidade do projeto (a.a.)
            <strong class="right">{{ $n(economicIndex.projectProfitabilityYear, 'percent') }}</strong>
          </li>
          <li>
            Prazo de retorno do investimento (n° meses)
            <strong class="right">{{ $n(economicIndex.termReturnInvestment, 'decimal') }}</strong>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="stylus" scoped>
@require './results'
</style>

<script>
export default {
  name: 'app-results',
  props: {
    total: {
      type: Object,
      required: true,
      default: () => ({
        investments: 0,
        fixedExpenses: 0,
        monthlyCost: 0,
        monthlyIncome: 0,
        acquisitionCost: 0
      })
    }
  },
  data: () => ({
    economicIndex: {
      contributionMargin: 0,
      salesProfitability: 0,
      breakEvenPoint: 0,
      projectProfitabilityMonth: 0,
      projectProfitabilityYear: 0,
      termReturnInvestment: 0
    }
  }),
  computed: {
    results () {
      let values = {
        investments: this.total.investments,
        monthlyIncome: this.total.monthlyIncome,
        percentAcquisitionCost: this.total.acquisitionCost,
        acquisitionCost: this.total.monthlyIncome * (this.total.acquisitionCost / 100),
        costProducts: this.total.monthlyCost,
        fixedExpenses: this.total.fixedExpenses
      }

      values.floatCost = this.total.monthlyCost + values.acquisitionCost
      values.contributionMargin = this.total.monthlyIncome - values.floatCost
      values.operationalResult = this.total.monthlyIncome - values.floatCost - this.total.fixedExpenses
      values.netProfit = this.total.monthlyIncome - values.floatCost - this.total.fixedExpenses
      values.breakEvenPoint = this.safeDivision(this.total.fixedExpenses / this.safeDivision(values.contributionMargin / this.total.monthlyIncome))

      this.economicIndex.contributionMargin = this.safeDivision(values.contributionMargin / values.monthlyIncome)
      this.economicIndex.salesProfitability = this.safeDivision(values.netProfit / values.monthlyIncome)
      this.economicIndex.breakEvenPoint = this.safeDivision(values.fixedExpenses / values.contributionMargin)
      this.economicIndex.projectProfitabilityMonth = this.safeDivision(values.netProfit / values.investments)
      this.economicIndex.projectProfitabilityYear = this.economicIndex.projectProfitabilityMonth * 12
      this.economicIndex.termReturnInvestment = this.safeDivision(values.investments / values.netProfit)

      return values
    }
  },
  methods: {
    safeDivision (a) {
      return isFinite(a) && typeof a === 'number' ? a : 0
    }
  }
}
</script>
