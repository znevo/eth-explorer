<template>
  <div id="app">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="select is-rounded is-pulled-right">
          <select v-model="network" @change="switchNetwork">
            <option value="homestead">Mainnet</option>
            <option value="ropsten">Ropsten</option>
            <option value="rinkeby">Rinkeby</option>
            <option value="goerli">Goerli</option>
          </select>
        </div>
        <p class="title">
          Ethereum Block Explorer
        </p>
      </div>
    </section>
    <router-view ref="routerView" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      network: 'homestead'
    }
  },
  methods: {
    switchNetwork() {
      this.$explorer.connectProvider(this.network);
      this.$route.name == 'Home'
        ? this.$refs.routerView.refresh()
        : this.$router.push('/');
    }
  }
}
</script>
