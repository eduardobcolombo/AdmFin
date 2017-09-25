<template>
  <div class="pl-1 pr-1" id="fixedExpenses">
    <v-form @submit.prevent="validateBeforeSubmit" novalidate>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex sm6>
            <v-text-field
              autofocus
              name="description"
              v-model.trim="fixedExpense.description"
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
              prefix="$"
              name="value"
              v-model.number="fixedExpense.price"
              :label="$t('label.value')"
              :data-vv-as="$t('label.value').toLowerCase()"
              :error-messages="errors.collect('value')"
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
      class="fixedExpenses-table elevation-1 mb-3"
      :headers="headers"
      :items="listFixedExpenses"
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
        <td class="text-xs-right">{{ $n(props.item.price, 'currency') }}</td>
      </template>
      <template slot="footer">
        <td class="grey lighten-4 text-xs-right pl-4 pr-4" colspan="100%">
          <strong>{{ $t('table.footer.total_of_fixed_expenses') }} {{ $n(total, 'currency') }}</strong>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  const uuidv4 = require('uuid/v4')

  export default {
    name: 'app-fixedExpenses',
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
          text: 'label.value',
          sortable: false,
          value: 'price'
        }
      ],
      fixedExpense: {description: '', price: 0},
      listFixedExpenses: []
    }),
    computed: {
      total () {
        const value = this.listFixedExpenses.reduce((sum, o) => sum + o.price, 0)
        this.$emit('total_fixedExpenses_change', value)

        return value
      }
    },
    methods: {
      remove () {
        const ids = this.selected.map((o) => o.id)
        this.listFixedExpenses = this.listFixedExpenses.filter((o) => !ids.includes(o.id))
      },

      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.listFixedExpenses.slice()
      },

      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.listFixedExpenses.push({
              id: uuidv4(),
              description: this.fixedExpense.description,
              price: this.fixedExpense.price
            })
            this.fixedExpense = {description: '', price: 0}
            this.errors.clear()
          }
        })
      }
    }
  }
</script>
