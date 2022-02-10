import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Block from '../views/Block.vue'
import Transactions from '../views/Transactions.vue'
import Transaction from '../views/Transaction.vue'
import Address from '../views/Address.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/block/:block',
    name: 'Block',
    component: Block
  },
  {
    path: '/block/:block/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/transaction/:transaction',
    name: 'Transaction',
    component: Transaction
  },
  {
    path: '/address/:address',
    name: 'Address',
    component: Address
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
