<template>
    <div id="investments">
        <h2>Investments</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: To make it dynamic  -->
        <!--* remember to add working capital-->
        <p>
            Description
            <input type="text" v-model="invest1.description" />
            Value
            <input type="text" v-model.number="invest1.price" @input="sum" />
            * remember to add working capital
        </p>
        <p>
            Description
            <input type="text" v-model="invest2.description" />
            Value
            <input type="text" v-model.number="invest2.price" @input="sum"/>
        </p>
        <p>
            Description
            <input type="text" v-model="invest3.description" />
            Value
            <input type="text" v-model.number="invest3.price" @input="sum"/>
        </p>

        <h3>Total of investments {{ total }}</h3>

    </div>
</template>


<script>
export default {
    name: "investments",
    data() {
        return {
            invest1: { description: '', price: 0},
            invest2: { description: '', price: 0},
            invest3: { description: '', price: 0},
            total: 0
        }
    },
    methods: {
        sum(){
            this.total = (this.invest1.price) + (this.invest2.price) + (this.invest3.price)
            this.$emit('total_investments_change',this.total);
        }
    }
}
</script>
