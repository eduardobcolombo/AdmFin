<template>
    <div id="results">
        <h2>Results</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: translate much better  -->
        <!--TODO: To organize repeted calcs on variables -->
        <button @click="load">Load</button>
        <p>
            1. - Montly Income
            R$ {{ results.montlyIncome }}
        </p>
        <p>
            2. - Float Cost
            R$ {{ results.floatCost }}
        </p>
        <p>
            2.1 - Cost of produts
            R$ {{ results.costProducts }}
        </p>
        <p>
            2.2 - Acquisition Cost (impostos, comissões, ...)
            R$ {{ results.acquisitionCost }}
            {{ total.acquisitionCost }} %
        </p>
        <p>
            3 - Contribution margin
            R$ {{ results.contributionMargin }}

        </p>
        <p>
            4 - Fixed expenses
            R$ {{ results.fixedExpenses }}
        </p>
        <p>
            5 - Operational result
            R$ {{ results.operationalResult  }}
        </p>
        <p>
            7 - Net profit
            R$ {{ results.netProfit }}
        </p>
        <p>
            8 - Break-even point
            R$ {{ results.breakEvenPoint }}
        </p>



<br />Margem de Contribuição (%) {{ economic_index.contributionMargin }}
<br />Lucratividade das vendas (%) {{ economic_index.salesProfitability }}
<br />Ponto de Equilibrio (R$) {{ economic_index.breakEvenPoint }}
<br />Rentabilidade do Projeto (% a.m.) {{ economic_index.projectProfitabilityMonth }}
<br />Rentabilidade do Projeto (% a.a.) {{ economic_index.projectProfitabilityYear }}
<br />Prazo Retorno Investimento (N° meses) {{ economic_index.termReturnInvestment }}

    </div>
</template>


<script>
export default {
    name: "results",
    props: ['total'],
    data() {
        return {
            results: {
                investments: 0,
                montlyIncome: 0,
                floatCost: 0,
                costProducts: 0,
                acquisitionCost: 0,
                contributionMargin: 0,
                fixedExpenses: 0,
                operationalResult: 0,
                netProfit: 0,
                breakEvenPoint: 0
            },
            economic_index: {
                contributionMargin: 0,
                salesProfitability: 0,
                breakEvenPoint: 0,
                projectProfitabilityMonth: 0,
                projectProfitabilityYear: 0,
                termReturnInvestment: 0,
            }
        }
    },
    methods: {
        load() {
            this.results.investments = this.total.investments
            this.results.montlyIncome = this.total.montlyIncome
            this.results.floatCost = this.total.montlyCost + this.total.montlyIncome * (this.total.acquisitionCost / 100)
            this.results.costProducts = this.total.montlyCost
            this.results.acquisitionCost = this.total.montlyIncome * (this.total.acquisitionCost / 100)
            this.results.contributionMargin = this.total.montlyIncome - (this.total.montlyCost + this.total.montlyIncome * (this.total.acquisitionCost / 100))
            this.results.fixedExpenses = this.total.fixedExpenses
            this.results.operationalResult = this.total.montlyIncome - (this.total.montlyCost + this.total.montlyIncome * (this.total.acquisitionCost / 100)) - this.total.fixedExpenses
            this.results.netProfit = this.total.montlyIncome - (this.total.montlyCost + this.total.montlyIncome * (this.total.acquisitionCost / 100)) - this.total.fixedExpenses
            this.results.breakEvenPoint = this.total.fixedExpenses / ((this.total.montlyIncome - (this.total.montlyCost + this.total.montlyIncome * (this.total.acquisitionCost / 100))) / this.total.montlyIncome)

            this.economic_index.contributionMargin = this.results.contributionMargin / this.results.montlyIncome
            this.economic_index.salesProfitability =  this.results.netProfit/ this.results.montlyIncome
            this.economic_index.breakEvenPoint = this.results.fixedExpenses / this.results.contributionMargin
            this.economic_index.projectProfitabilityMonth = this.results.netProfit / this.results.investments
            this.economic_index.projectProfitabilityYear = this.economic_index.projectProfitabilityMonth * 12
            this.economic_index.termReturnInvestment = this.results.investments / this.results.netProfit
        }
    }
}

</script>
