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
            Unit Value
            <input type="text" v-model.number="product1.price" @input="sum" />
        </p>
        <p>
            Product
            <input type="text" v-model="product2.description" />
            Amount
            <input type="text" v-model.number="product2.amount" @input="sum" />
            Unit Value
            <input type="text" v-model.number="product2.price" @input="sum" />
        </p>
        <p>
            Product
            <input type="text" v-model="product3.description" />
            Amount
            <input type="text" v-model.number="product3.amount" @input="sum" />
            Unit Value
            <input type="text" v-model.number="product3.price" @input="sum" />
        </p>


        <h3>Total of montly income {{ total }}</h3>

    </div>
</template>


<script>
export default {
    name: "montlyIncome",

    data() {
        return {
            product1: { description: '', amount: 0, price: 0},
            product2: { description: '', amount: 0, price: 0},
            product3: { description: '', amount: 0, price: 0},
            total: 0
        }
    },
    methods: {
        sum(){
            this.total = (this.product1.price * this.product1.amount) + (this.product2.price * this.product2.amount) + (this.product3.price * this.product3.amount)
//            this.total = parseFloat(this.invest1.price) + parseFloat(this.invest2.price) + parseFloat(this.invest3.price)
        }
    }
}
</script>
