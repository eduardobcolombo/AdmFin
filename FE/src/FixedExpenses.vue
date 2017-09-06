<template>
    <div id="fixedExpenses">
        <h2>Fixed Expenses</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: To make it dynamic  -->

        <p>
            Description
            <input type="text" v-model="fixedExpense1.description" />
            Value
            <input type="text" v-model.number="fixedExpense1.price" @input="sum" />
        </p>
        <p>
            Description
            <input type="text" v-model="fixedExpense2.description" />
            Value
            <input type="text" v-model.number="fixedExpense2.price" @input="sum"/>
        </p>
        <p>
            Description
            <input type="text" v-model="fixedExpense3.description" />
            Value
            <input type="text" v-model.number="fixedExpense3.price" @input="sum"/>
        </p>

        <h3>Total of fixed expenses {{ total }}</h3>

    </div>
</template>


<script>
export default {
    name: "fixedExpenses",

    data() {
        return {
            fixedExpense1: { description: '', price: 0},
            fixedExpense2: { description: '', price: 0},
            fixedExpense3: { description: '', price: 0},
            total: 0
        }
    },
    methods: {
        sum(){
            this.total = (this.fixedExpense1.price) + (this.fixedExpense2.price) + (this.fixedExpense3.price)
//            this.total = parseFloat(this.fixedExpense1.price) + parseFloat(this.fixedExpense2.price) + parseFloat(this.fixedExpense3.price)
        }
    }
}
</script>
