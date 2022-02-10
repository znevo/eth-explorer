<template>
  <div class="home">

    <section class="section">
      <div class="container">

        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li class="is-active">
              <a href="#" aria-current="page">
                <span class="icon is-small">
                  <i class="fas fa-home" aria-hidden="true"></i>
                </span>
                Home
              </a>
            </li>
          </ul>
        </nav>

        <h5 class="title is-4">Latest Blocks</h5>

        <table class="table" width="100%">
          <tbody>
            <tr>
              <td class="is-size-7">Block</td>
              <td class="is-size-7">Age</td>
              <td class="is-size-7">Txn</td>
              <td class="is-size-7">Nonce</td>
              <td class="is-size-7">Gas Used</td>
              <td class="is-size-7">Gas Limit</td>
              <td class="is-size-7">Block Space</td>
            </tr>
            <tr v-for="block in latestBlocks" :key="block.number">
              <td>
                <router-link :to="{ name: 'Block', params: { block: block.number } }">
                  {{ block.number }}
                </router-link>
              </td>
              <td>{{ block.ago }}</td>
              <td>
                <router-link :to="{ name: 'Transactions', params: { block: block.number } }">
                  {{ block.transactions }}
                </router-link>
              </td>
              <td>{{ block.nonce }}</td>
              <td>{{ block.gasUsed }}</td>
              <td>{{ block.gasLimit }}</td>
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
  name: 'Home',
  components: {
    blockspace,
  },
  data() {
    return {
      blocks: [],
    }
  },
  methods: {
    async refresh() {
      this.blocks = [];

      for ( let i = -14; i <= 0; i++ ) {
        const block = await this.$explorer.getBlock(i || "latest");
        this.blocks.unshift(block);
      }

      this.$explorer.provider.on("block", async(blockNumber) => {
        if ( ! this.hasBlock(blockNumber) ) {
          const block = await this.$explorer.getBlock(blockNumber);
          this.blocks.unshift(block);
        }
      });
    },

    hasBlock(blockNumber) {
      return !! this.blocks.filter((block) => block.number == blockNumber).length;
    }
  },
  computed: {
    latestBlocks() {
      return this.blocks.slice(0,15);
    }
  },
  mounted() {
    this.refresh();
  }
}
</script>
