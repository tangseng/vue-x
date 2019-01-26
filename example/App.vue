<template>
  <div>
    <div>总数：{{ total }}</div>
    <ul>
      <li v-for="(item, key) in list" :key="key">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import './vue-x'

export default {
  ts: [
    [
      'common', 
      {
        action: true,
        list: true,
        total: true
      }
    ]
  ],

  async created () {
    await this.commonAction({
      id: 1
    })
  }
}
</script>