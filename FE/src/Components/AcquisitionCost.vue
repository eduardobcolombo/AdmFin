<template>
    <div id="acquisitionCost">
        <h2>Acquisition Cost</h2>
        <!--TODO: To make a cool layout  -->
        <!--TODO: To make it dynamic  -->

        <p>
            Description
            <input type="text" v-model="aquisition_cost1.description" />
            % incidence on sales
            <input type="text" v-model.number="aquisition_cost1.incidence" @input="sum" />
        </p>
        <p>
            Description
            <input type="text" v-model="aquisition_cost2.description" />
            % incidence on sales
            <input type="text" v-model.number="aquisition_cost2.incidence" @input="sum" />
        </p>
        <p>
            Description
            <input type="text" v-model="aquisition_cost3.description" />
            % incidence on sales
            <input type="text" v-model.number="aquisition_cost3.incidence" @input="sum" />
        </p>

        <h3>Total of aquisition cost {{ totalAquisitionCost }} %</h3>

    </div>
</template>


<script>
export default {
    name: "acquisitionCost",

    data() {
        return {
            aquisition_cost1: { description: '', incidence: 0},
            aquisition_cost2: { description: '', incidence: 0},
            aquisition_cost3: { description: '', incidence: 0},
            totalAquisitionCost: 0
        }
    },
    methods: {
        sum(){
            this.totalAquisitionCost = (this.aquisition_cost1.incidence) + (this.aquisition_cost2.incidence) + (this.aquisition_cost3.incidence)
            this.$emit('total_acquisitionCost_change',this.totalAquisitionCost);
        }
    }
}
</script>
