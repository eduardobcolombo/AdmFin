<template>
  <v-app>
    <v-card class="grey lighten-5" flat>
      <v-toolbar class="primary elevation-0" dark extended>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <v-btn class="btn--locale" outline slot="activator">
            <flag :iso="getIso(locale)" :title="locale" />
          </v-btn>
          <v-list>
            <v-list-tile v-for="l in availableLocales" :data="l" :key="l" @click="setLocale(l)">
              <v-list-tile-title>
                <flag :iso="getIso(l)" :title="l" /> {{ l }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-layout row>
        <v-flex md10 offset-md1 lg8 offset-lg2 xl8 offset-xl2>
          <v-card class="card--flex-toolbar elevation-0">
            <v-toolbar class="white" card prominent>
              <v-toolbar-title class="subheading primary--text">{{ $t('msg') }}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-stepper class="elevation-0" v-model="step" vertical>
                <v-stepper-step editable step="1" v-bind:complete="step > 1">
                  {{ $t('steps.investments') }}
                </v-stepper-step>
                <v-stepper-content step="1">
                  <app-investments @total_investments_change="total.investments = $event"></app-investments>
                  <v-layout row wrap>
                    <v-flex class="text-xs-right" sm12>
                      <v-btn primary @click.native="step = 2">{{ $t('next') }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-stepper-content>
                <v-stepper-step editable step="2" v-bind:complete="step > 2">
                  {{ $t('steps.fixed_expenses') }}
                </v-stepper-step>
                <v-stepper-content step="2">
                  <app-fixedExpenses @total_fixedExpenses_change="total.fixedExpenses = $event"></app-fixedExpenses>
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn flat @click.native="step = 1">{{ $t('previous') }}</v-btn>
                    </v-flex>
                    <v-flex class="text-xs-right" sm6>
                      <v-btn primary @click.native="step = 3">{{ $t('next') }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-stepper-content>
                <v-stepper-step editable step="3" v-bind:complete="step > 3">
                  {{ $t('steps.monthly_income') }}
                </v-stepper-step>
                <v-stepper-content step="3">
                  <app-monthlyIncome @total_monthlyCost_change="total.monthlyCost = $event" @total_monthlyIncome_change="total.monthlyIncome = $event"></app-monthlyIncome>
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn flat @click.native="step = 2">{{ $t('previous') }}</v-btn>
                    </v-flex>
                    <v-flex class="text-xs-right" sm6>
                      <v-btn primary @click.native="step = 4">{{ $t('next') }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-stepper-content>
                <v-stepper-step editable step="4" v-bind:complete="step > 4">
                  {{ $t('steps.acquisition_cost') }}
                </v-stepper-step>
                <v-stepper-content step="4">
                  <app-acquisitionCost @total_acquisitionCost_change="total.acquisitionCost = $event"></app-acquisitionCost>
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn flat @click.native="step = 3">{{ $t('previous') }}</v-btn>
                    </v-flex>
                    <v-flex class="text-xs-right" sm6>
                      <v-btn primary @click.native="step = 5">{{ $t('next') }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-stepper-content>
                <v-stepper-step editable step="5">
                  {{ $t('steps.results') }}
                </v-stepper-step>
                <v-stepper-content step="5">
                  <app-results :total="total"></app-results>
                  <v-layout row wrap>
                    <v-flex sm12>
                      <v-btn flat @click.native="step = 4">{{ $t('previous') }}</v-btn>
                    </v-flex>
                  </v-layout>
                </v-stepper-content>
              </v-stepper>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-app>
</template>

<style lang="stylus">
@require './styl/main'
</style>

<script>
  export default {
    name: 'app',
    data: () => ({
      availableLocales: [
        'en',
        'pt-BR'
      ],
      locale: window.navigator.language || 'en',
      step: 1,
      total: {
        investments: 0,
        fixedExpenses: 0,
        monthlyCost: 0,
        monthlyIncome: 0,
        acquisitionCost: 0
      }
    }),
    watch: {
      locale (val) {
        this.$i18n.locale = val
      }
    },
    methods: {
      getIso (locale) {
        const iso = {
          'en': 'us',
          'pt-BR': 'br'
        }

        return iso[locale]
      },
      setLocale (val) {
        this.locale = val
        this.$validator.setLocale(val.replace('-', '_'))
      }
    }
  }
</script>
