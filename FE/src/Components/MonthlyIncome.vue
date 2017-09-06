<template>
    <div id="montlyIncome">
        <h2>Monthly Income</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: To make it dynamic  -->

        <p>
            Product
            <input type="text" v-model="product1.description" />
            Amount
            <input type="text" v-model.number="product1.amount" @input="sum" />
            Cost Unit
            <input type="text" v-model.number="product1.cost" @input="sum" />
            Unit Value
            <input type="text" v-model.number="product1.price" @input="sum" />
        </p>
        <p>
            Product
            <input type="text" v-model="product2.description" />
            Amount
            <input type="text" v-model.number="product2.amount" @input="sum" />
            Cost Unit
            <input type="text" v-model.number="product2.cost" @input="sum" />
            Unit Value
            <input type="text" v-model.number="product2.price" @input="sum" />
        </p>
        <p>
            Product
            <input type="text" v-model="product3.description" />
            Amount
            <input type="text" v-model.number="product3.amount" @input="sum" />
            Cost Unit
            <input type="text" v-model.number="product3.cost" @input="sum" />
            Unit Value
            <input type="text" v-model.number="product3.price" @input="sum" />
        </p>

        <h3>Total of montly cost {{ totalCost }}</h3>
        <h3>Total of montly income {{ totalIncome }}</h3>

    </div>
</template>


<script>
export default {
    name: "montlyIncome",

    data() {
        return {
            product1: { description: '', amount: 0, cost: 0, price: 0},
            product2: { description: '', amount: 0, cost: 0, price: 0},
            product3: { description: '', amount: 0, cost: 0, price: 0},
            totalCost: 0,
            totalIncome: 0
        }
    },
    methods: {
        sum(){
            this.totalIncome = (this.product1.price * this.product1.amount) + (this.product2.price * this.product2.amount) + (this.product3.price * this.product3.amount)
            this.$emit('total_montlyIncome_change',this.totalIncome);
            this.totalCost = (this.product1.cost * this.product1.amount) + (this.product2.cost * this.product2.amount) + (this.product3.cost * this.product3.amount)
            this.$emit('total_montlyCost_change',this.totalCost);
        }
    }
}
</script>
