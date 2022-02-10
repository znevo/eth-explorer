<template>
  <div class="block">

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
            <li class="is-active">
              <a href="#" aria-current="page">Block {{ $route.params.block }}</a>
            </li>
          </ul>
        </nav>

        <h5 class="title is-4">Block Details</h5>

        <table class="table" width="100%" v-if="block">
          <tbody>
            <tr>
              <td width="25%">Block Height</td>
              <td>{{ block.number }}</td>
            </tr>
            <tr>
              <td>Timestamp</td>
              <td>{{ block.ago }}</td>
            </tr>
            <tr>
              <td>Transactions</td>
              <td>
                <router-link :to="{ name: 'Transactions', params: { block: block.number } }">
                  {{ block.transactions }}
                </router-link>
              </td>
            </tr>
            <tr>
              <td>Hash</td>
              <td>{{ block.hash }}</td>
            </tr>
            <tr>
              <td>Nonce</td>
              <td>{{ block.nonce }}</td>
            </tr>
            <tr>
              <td>Difficulty</td>
              <td>{{ block.difficulty }}</td>
            </tr>
            <tr>
              <td>Gas Used</td>
              <td>{{ block.gasUsed }}</td>
            </tr>
            <tr>
              <td>Gas Limit</td>
              <td>{{ block.gasLimit }}</td>
            </tr>
            <tr>
              <td>Block Space</td>
              <td style="vertical-align: middle;">
                <blockspace :utilization="block.blockspace"></blockspace>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </section>

  </div>
</template>

<script>
import blockspace from '@/components/blockspace.vue';

export default {
  name: 'Block',
  components: {
    blockspace,
  },
  data() {
    return {
      block: null,
    }
  },
  async mounted() {
    const blockNumber = parseInt(this.$route.params.block);
    this.block = await this.$explorer.getBlock(blockNumber);
  }
}
</script>
