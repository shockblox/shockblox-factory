<template>
  <div id="app-wrap">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  }
}
</script>


<style lang="scss">
@import 'bootstrap', '@/assets/scss/app.scss'
</style>
