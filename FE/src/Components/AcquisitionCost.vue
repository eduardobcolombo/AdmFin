<template>
  <div class="pl-1 pr-1" id="acquisitionCost">
    <v-form @submit.prevent="validateBeforeSubmit" novalidate>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex sm6>
            <v-text-field
              autofocus
              name="description"
              v-model.trim="acquisitionCost.description"
              :label="$t('label.description')"
              :data-vv-as="$t('label.description').toLowerCase()"
              :error-messages="errors.collect('description')"
              v-validate="'required|min:2'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex sm2>
            <v-text-field
              type="number"
              name="incidence"
              v-model.number="acquisitionCost.incidence"
              :label="$t('label.incidence')"
              :data-vv-as="$t('label.incidence').toLowerCase()"
              :error-messages="errors.collect('incidence')"
              v-validate="'required'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex class="text-xs-right pr-0" sm3>
            <v-btn class="mr-0" fab outline primary small type="submit">
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
          <v-flex class="text-xs-right pr-0" sm1>
            <v-btn class="mr-0" fab outline error small :disabled="selected.length === 0" @click="remove">
              <v-icon>remove</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-data-table
      class="aquisition-table elevation-1 mb-3"
      :headers="headers"
      :items="listAcquisition"
      :no-data-text="$t('table.no_data_available')"
      v-model="selected"
      hide-actions
      selected-key="id"
      select-all
    >
      <template slot="headers" scope="props">
        <tr>
          <th>
            <v-checkbox
              primary
              color="primary"
              hide-details
              @click.native="toggleAll"
              :input-value="props.all"
              :indeterminate="props.indeterminate"
            ></v-checkbox>
          </th>
          <th :class="`column text-xs-${header.align || 'right'}`" v-for="header in props.headers" :key="header.text">
            {{ $t(header.text) }}
          </th>
        </tr>
      </template>
      <template slot="items" scope="props">
        <td>
          <v-checkbox
            primary
            color="primary"
            hide-details
            v-model="props.selected"
          ></v-checkbox>
        </td>
        <td>{{ props.item.description }}</td>
        <td class="text-xs-right">{{ $n(props.item.incidence, 'currency') }}</td>
      </template>
      <template slot="footer">
        <td class="grey lighten-4 text-xs-right pl-4 pr-4" colspan="100%">
          <strong>{{ $t('table.footer.total_of_acquisition_cost') }} {{ $n(total, 'currency') }}</strong>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  const uuidv4 = require('uuid/v4')

  export default {
    name: 'app-acquisitionCost',
    $validates: true,
    data: () => ({
      selected: [],
      headers: [
        {
          text: 'label.description',
          align: 'left',
          sortable: false,
          value: 'description'
        },
        {
          text: 'label.incidence',
          sortable: false,
          value: 'incidence'
        }
      ],
      acquisitionCost: {description: '', incidence: 0},
      listAcquisition: []
    }),
    computed: {
      total () {
        const value = this.listAcquisition.reduce((sum, o) => sum + o.incidence, 0)
        this.$emit('total_acquisitionCost_change', value)

        return value
      }
    },
    methods: {
      remove () {
        const ids = this.selected.map((o) => o.id)
        this.listAcquisition = this.listAcquisition.filter((o) => !ids.includes(o.id))
      },

      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.listAcquisition.slice()
      },

      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.listAcquisition.push({
              id: uuidv4(),
              description: this.acquisitionCost.description,
              incidence: this.acquisitionCost.incidence
            })
            this.acquisitionCost = {description: '', incidence: 0}
            this.errors.clear()
          }
        })
      }
    }
  }
</script>
