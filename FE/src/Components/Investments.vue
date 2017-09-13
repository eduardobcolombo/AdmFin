<template>
    <div id="investments">
        <h2>Investments</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: To make it dynamic  -->
        <!--* remember to add working capital-->
        <p>
            Description
            <input type="text" v-model="invest.description" />
            Value
            <input type="text" v-model.number="invest.price" />
            <input type="button" value="Add" v-on:click="sum" />
        </p>
        <p>
            * remember to add working capital
        </p>
        <ul id="investments-ul">
            <li v-for="inv in total_investments.list_investments">
                {{ inv.price | currency 'R$' }} - {{inv.description}}
            </li>
        </ul>

        <h3>Total of investments {{ total_investments.total }}</h3>


    </div>
</template>


<script>
export default {
    name: "investments",
    data() {
        return {
            invest: { description: '', price: 0},
            total_investments: { total:0 , list_investments: [] }
        }
    },
    methods: {
        sum(){
            this.total_investments.total = this.total_investments.total + this.invest.price;
            this.total_investments.list_investments.push(this.invest);
            this.invest = {};

            this.$emit('total_investments_change',this.total_investments);
        }
    }
}
</script>
