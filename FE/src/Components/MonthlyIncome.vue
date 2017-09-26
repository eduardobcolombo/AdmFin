<template>
  <div class="pl-1 pr-1" id="monthlyIncome">
    <v-form @submit.prevent="validateBeforeSubmit" novalidate>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex sm4>
            <v-text-field
              autofocus
              name="description"
              v-model.trim="product.description"
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
              name="amount"
              v-model.number="product.amount"
              :label="$t('label.amount')"
              :data-vv-as="$t('label.amount').toLowerCase()"
              :error-messages="errors.collect('amount')"
              v-validate="'required'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex sm2>
            <v-text-field
              type="number"
              prefix="$"
              name="cost"
              v-model.number="product.cost"
              :label="$t('label.cost')"
              :data-vv-as="$t('label.cost').toLowerCase()"
              :error-messages="errors.collect('cost')"
              v-validate="'required'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex sm2>
            <v-text-field
              type="number"
              prefix="$"
              name="price"
              v-model.number="product.price"
              :label="$t('label.price')"
              :data-vv-as="$t('label.value').toLowerCase()"
              :error-messages="errors.collect('price')"
              v-validate="'required'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex class="text-xs-right pr-0" sm1>
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
      class="products-table elevation-1 mb-3"
      :headers="headers"
      :items="listProducts"
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
        <td class="text-xs-right">{{ $n(props.item.amount, 'currency') }}</td>
        <td class="text-xs-right">{{ $n(props.item.cost, 'currency') }}</td>
        <td class="text-xs-right">{{ $n(props.item.price, 'currency') }}</td>
      </template>
      <template slot="footer">
        <tr>
          <td class="grey lighten-4 text-xs-right" colspan="100%">
            <strong>{{ $t('table.footer.total_of_monthly_cost') }} {{ $n(totalMonthly.totalCost, 'currency') }}</strong>
          </td>
        </tr>
        <tr>
          <td class="grey lighten-4 text-xs-right pl-4 pr-4" colspan="100%">
            <strong>{{ $t('table.footer.total_of_monthly_income') }} {{ $n(totalMonthly.totalIncome, 'currency') }}</strong>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const uuidv4 = require('uuid/v4')

export default {
  name: 'app-monthly-income',
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
        text: 'label.amount',
        sortable: false,
        value: 'amount'
      },
      {
        text: 'label.cost',
        sortable: false,
        value: 'cost'
      },
      {
        text: 'label.price',
        sortable: false,
        value: 'price'
      }
    ],
    product: {description: '', amount: 0, cost: 0, price: 0},
    listProducts: []
  }),
  computed: {
    totalMonthly () {
      const value = this.listProducts.reduce((sum, o) => {
        sum.totalCost = sum.totalCost + (o.cost * o.amount)
        sum.totalIncome = sum.totalIncome + (o.price * o.amount)

        return sum
      }, {totalCost: 0, totalIncome: 0})

      this.$emit('total_monthlyCost_change', value.totalCost)
      this.$emit('total_monthlyIncome_change', value.totalIncome)

      return value
    }
  },
  methods: {
    remove () {
      const ids = this.selected.map((o) => o.id)
      this.listProducts = this.listProducts.filter((o) => !ids.includes(o.id))
    },

    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.listProducts.slice()
    },

    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.listProducts.push({
            id: uuidv4(),
            description: this.product.description,
            amount: this.product.amount,
            cost: this.product.cost,
            price: this.product.price
          })
          this.product = {description: '', amount: 0, cost: 0, price: 0}
          this.errors.clear()
        }
      })
    }

  }
}
</script>
