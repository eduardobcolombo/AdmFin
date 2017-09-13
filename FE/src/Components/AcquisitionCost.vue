<template>
    <div id="acquisitionCost">
        <h2>Acquisition Cost</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: To make it dynamic  -->

        <p>
            Description
            <input type="text" v-model="aquisition_cost.description" />
            % incidence on sales
            <input type="text" v-model.number="aquisition_cost.incidence" />

            <input type="button" value="Add" v-on:click="sum" />
        </p>

        <ul id="aquisition-ul">
            <li v-for="aqCost in total_aquisitionCost.list_aquisition">
                {{ aqCost.incidence | currency 'R$' }} - {{aqCost.description}}
            </li>
        </ul>

        <h3>Total of aquisition cost {{ total_aquisitionCost.total }} %</h3>

    </div>
</template>


<script>
export default {
    name: "acquisitionCost",

    data() {
        return {
            aquisition_cost: { description: '', incidence: 0},
            total_aquisitionCost: { total:0 , list_aquisition: [] }
        }
    },
    methods: {
        sum(){
            this.total_aquisitionCost.total = this.total_aquisitionCost.total + this.aquisition_cost.incidence;
            this.total_aquisitionCost.list_aquisition.push(this.aquisition_cost);
            this.aquisition_cost = {};
            this.$emit('total_acquisitionCost_change',this.total_aquisitionCost);
        }
    }
}
</script>
