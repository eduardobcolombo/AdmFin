<template>
  <div id="app">
    <h1>{{ msg }}</h1>

    <app-investments></app-investments>
    <app-fixedExpenses></app-fixedExpenses>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'Make sure is good idea buy or create a business!'
    }
  }
}
</script>
