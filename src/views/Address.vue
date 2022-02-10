<template>
  <div class="address">

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
            <li class="is-active"><a href="#" aria-current="page">{{ $route.params.address }}</a></li>
          </ul>
        </nav>

        <h5 class="title is-4">Account Details</h5>

        <table class="table" width="100%" v-if="account">
          <tbody>
            <tr>
              <td width="25%">Balance</td>
              <td>{{ account.balance }}</td>
            </tr>
            <tr>
              <td width="25%">Nonce</td>
              <td>{{ account.nonce }}</td>
            </tr>
            <tr>
              <td width="25%">Account Type</td>
              <td>{{ account.isContract ? 'Smart Contract' : 'Externally Owned Account' }}</td>
            </tr>
            <tr v-if="account.isContract">
              <td width="25%">Bytecode</td>
              <td>
                <textarea class="textarea is-size-7" rows="20" v-model="account.code"></textarea>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'Address',
  data() {
    return {
      account: null,
    }
  },
  async mounted() {
    const balance = await this.$explorer.provider.getBalance(this.$route.params.address);
    const nonce = await this.$explorer.provider.getTransactionCount(this.$route.params.address);
    const code = await this.$explorer.provider.getCode(this.$route.params.address);

    this.account = {
      balance: this.$explorer.toEth(balance),
      nonce,
      code,
      isContract: code == "0x" ? false : true,
    }
  }
}
</script>
