<template>
  <div>
    <div>总数：{{ total }}</div>
    <ul>
      <li v-for="(item, key) in list" :key="key">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { store } from './vue-x'

export default {
  beforeCreate () {
    this.$store = store 
  },

  ts: [
    [
      'common', 
      {
        action: 'commonZhiAction',
        list: true,
        total: true
      }
    ]
  ],

  async created () {
    await this.commonZhiAction({
      id: 1
    })
  }
}
</script>