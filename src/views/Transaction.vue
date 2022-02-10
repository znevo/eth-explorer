<template>
  <div class="transaction">

    <section class="section" v-if="transaction && block">
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
              <router-link :to="{ name: 'Block', params: { block: block.number } }">
                Block {{ block.number }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Transactions', params: { block: block.number } }">
                Transactions
              </router-link>
            </li>
            <li class="is-active">
              <a href="#" aria-current="page">{{ transaction.transactionIndex }}</a>
            </li>
          </ul>
        </nav>

        <h5 class="title is-4">Transaction Details</h5>

        <table class="table" width="100%">
          <tbody>
            <tr>
              <td width="25%">Transaction Hash</td>
              <td>{{ transaction.hash }}</td>
            </tr>
            <tr>
              <td width="25%">Block</td>
              <td>
                <router-link :to="{ name: 'Block', params: { block: block.number } }">
                  {{ block.number }}
                </router-link>
              </td>
            </tr>
            <tr>
              <td width="25%">Timestamp</td>
              <td>{{ block.ago }}</td>
            </tr>
            <tr>
              <td width="25%">Index</td>
              <td>{{ transaction.transactionIndex }}</td>
            </tr>
            <tr>
              <td width="25%">From</td>
              <td>
                <router-link :to="{ name: 'Address', params: { address: transaction.from } }">
                  {{ transaction.from }}
                </router-link>
              </td>
            </tr>
            <tr>
              <td width="25%">To</td>
              <td>
                <router-link :to="{ name: 'Address', params: { address: transaction.to } }">
                  {{ transaction.to }}
                </router-link>
              </td>
            </tr>
            <tr>
              <td width="25%">Value</td>
              <td>{{ $explorer.toEth(transaction.value) }} Ether</td>
            </tr>
            <tr>
              <td width="25%">Gas Price</td>
              <td>{{ $explorer.toGwei(transaction.gasPrice) }} Gwei</td>
            </tr>
            <tr>
              <td width="25%">Gas Limit</td>
              <td>{{ $explorer.commify(transaction.gasLimit) }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Transaction',
  data() {
    return {
      block: null,
      transaction: null,
    }
  },
  async mounted() {
    const transactionHash = this.$route.params.transaction;
    this.transaction = await this.$explorer.provider.getTransaction(transactionHash);
    this.block = await this.$explorer.getBlock(this.transaction.blockNumber);
  }
}
</script>
