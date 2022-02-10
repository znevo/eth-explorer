<template>
  <div class="transactions">

    <section class="section">
      <div class="container">

        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <router-link to="/">
                <span class="icon is-small">
                  <i class="fas fa-home" aria-hidden="true"></i>
                </span>
                Home
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Block', params: { block: this.$route.params.block } }">
                Block {{ this.$route.params.block }}
              </router-link>
            </li>
            <li class="is-active">
              <a href="#" aria-current="page">Transactions</a>
            </li>
          </ul>
        </nav>

        <h5 class="title is-4">Transactions</h5>

        <table class="table" width="100%" v-if="transactions.length">
          <tbody>
            <tr>
              <td class="is-size-7">Hash</td>
              <td class="is-size-7">From</td>
              <td class="is-size-7">To</td>
              <td class="is-size-7">Value</td>
            </tr>
            <tr v-for="transaction in transactions" :key="transaction.hash">
              <td class="ellipses">
                <router-link :to="{ name: 'Transaction', params: { transaction: transaction.hash } }">
                  {{ transaction.hash }}
                </router-link>
              </td>
              <td class="ellipses">
                <router-link :to="{ name: 'Address', params: { address: transaction.from } }">
                  {{ transaction.from }}
                </router-link>
              </td>
              <td class="ellipses">
                <router-link :to="{ name: 'Address', params: { address: transaction.to } }">
                  {{ transaction.to }}
                </router-link>
              </td>
              <td>{{ $explorer.toEth(transaction.value) }} Ether</td>
            </tr>
          </tbody>
        </table>

      </div>
    </section>

  </div>
</template>

<style>
  .ellipses {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
  }
</style>

<script>
export default {
  name: 'Transactions',
  data() {
    return {
      block: null,
      transactions: [],
    }
  },
  async mounted() {
    const blockNumber = parseInt(this.$route.params.block);
    this.block = await this.$explorer.provider.getBlockWithTransactions(blockNumber);
    this.transactions = this.block.transactions.reverse();
  }
}
</script>
