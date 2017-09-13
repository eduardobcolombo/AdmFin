<template>
    <div id="fixedExpenses">
        <h2>Fixed Expenses</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: To make it dynamic  -->

        <p>
            Description
            <input type="text" v-model="fixedExpense.description" />
            Value
            <input type="text" v-model.number="fixedExpense.price" />

            <input type="button" value="Add" v-on:click="sum" />
        </p>
         <ul id="fixedExpenses-ul">
            <li v-for="fixExp in total_fixedExpenses.list_fixedExpenses">
                {{ fixExp.price | currency 'R$' }} - {{fixExp.description}}
            </li>
        </ul>


        <h3>Total of fixed expenses {{ total_fixedExpenses.total }}</h3>

    </div>
</template>


<script>
export default {
    name: "fixedExpenses",

    data() {
        return {
            fixedExpense: { description: '', price: 0},
            total_fixedExpenses: { total:0 , list_fixedExpenses: [] }
        }
    },
    methods: {
        sum(){
            this.total_fixedExpenses.total = this.total_fixedExpenses.total + this.fixedExpense.price;
            this.total_fixedExpenses.list_fixedExpenses.push(this.fixedExpense);
            this.fixedExpense = {};

            this.$emit('total_fixedExpenses_change',this.total_fixedExpenses);
        }
    }
}
</script>
