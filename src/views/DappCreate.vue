<template>
  <div class="p-5">
    <div class="container">
      <div v-if="!$store.state.userDID" class="text-center">
        <NotAuthorized />
      </div>
      <div v-else>
        <h1>Create a DApp</h1>
        <div class="alert alert-info">{{userDID}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NotAuthorized from '@/components/NotAuthorized'

export default {
    name: 'DAppCreate',
    components: {
        NotAuthorized
    },
    computed: {
        userDID() {
            return this.$store.state.userDID
        },
        ceramicURL() {
            return process.env.VUE_APP_CERAMIC_DEV_URL
        }
    }
}
</script>
