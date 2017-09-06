<template>
    <div id="results">
        <h2>Results</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: translate much better  -->
        <!--TODO: To organize repeted calcs on variables -->

        <p>
            1. - Montly Income
            R$ {{ total.montlyIncome }}
        </p>
        <p>
            2. - Float Cost
            R$ {{ total.montlyCost + total.montlyIncome * (total.acquisitionCost / 100) }}
        </p>
        <p>
            2.1 - Custos dos produtos
            R$ {{ total.montlyCost }}
        </p>
        <p>
            2.2 - Acquisition Cost (impostos, comissões, ...)
            R$ {{ total.montlyIncome * (total.acquisitionCost / 100) }}
            {{ total.acquisitionCost }} %
        </p>
        <p>
            3 - Contribution margin
            R$ {{ total.montlyIncome - (total.montlyCost + total.montlyIncome * (total.acquisitionCost / 100)) }}
        </p>
        <p>
            4 - Fixed expenses
            R$ {{ total.fixedExpenses }}
        </p>
        <p>
            5 - Operational result
            R$ {{ total.montlyIncome - (total.montlyCost + total.montlyIncome * (total.acquisitionCost / 100)) - total.fixedExpenses  }}
        </p>
        <p>
            7 - Net profit
            R$ {{ total.montlyIncome - (total.montlyCost + total.montlyIncome * (total.acquisitionCost / 100)) - total.fixedExpenses  }}
        </p>
        <p>
            8 - Break-even point
            R$ {{ total.fixedExpenses / ((total.montlyIncome - (total.montlyCost + total.montlyIncome * (total.acquisitionCost / 100))) / total.montlyIncome) }}
        </p>

    </div>
</template>


<script>
export default {
    name: "results",
    props: ['total'],
    data() {

    }
}
</script>
