<template>
  <div class="p-5">
    <div class="container">
      <div v-if="!$store.state.userDID" class="text-center">
        <NotAuthorized />
      </div>
      <div v-else>
        <DefList />
      </div>
    </div>
  </div>
</template>

<script>
import NotAuthorized from '@/components/NotAuthorized'
import DefList from '@/components/DefList'

export default {
  name: 'Definitions',
  components: {
    NotAuthorized,
    DefList
  }
}
</script>
