<template>
    <div id="montlyIncome">
        <h2>Monthly Income</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: To make it dynamic  -->

        <p>
            Product
            <input type="text" v-model="product.description" />
            Amount
            <input type="text" v-model.number="product.amount"  />
            Cost Unit
            <input type="text" v-model.number="product.cost"  />
            Unit Value
            <input type="text" v-model.number="product.price"  />

            <input type="button" value="Add" v-on:click="sum" />
        </p>

         <ul id="products-ul">
            <li v-for="prod in total_montly.list_products">
                {{ prod.price | currency 'R$' }} - {{prod.description}}
            </li>
        </ul>

        <h3>Total of montly cost {{ total_montly.totalCost }}</h3>
        <h3>Total of montly income {{ total_montly.totalIncome }}</h3>

    </div>
</template>


<script>
export default {
    name: "montlyIncome",

    data() {
        return {
            product: { description: '', amount: 0, cost: 0, price: 0},
            total_montly:{totalCost: 0,totalIncome: 0, list_products:[]}
        }
    },
    methods: {
        sum(){
            this.total_montly.totalIncome = this.total_montly.totalIncome + (this.product.price * this.product.amount);
            this.total_montly.totalCost = this.total_montly.totalCost + (this.product.cost * this.product.amount);
            this.product = {};
            this.$emit('total_montly_change',this.total_montly);
        }
    }
}
</script>
