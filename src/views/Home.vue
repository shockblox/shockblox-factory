<template>
  <div class="p-5">
    <div class="container">
      <div v-if="!$store.state.userDID" class="text-center">
        <NotAuthorized />
      </div>
      <div v-else>
        <IDXSetBasicProfile />
      </div>
    </div>
  </div>
</template>

<script>
import NotAuthorized from '@/components/NotAuthorized'
import IDXSetBasicProfile from '@/components/IDXSetBasicProfile'

export default {
  name: 'Home',
  components: {
    NotAuthorized,
    IDXSetBasicProfile
  }
}
</script>
