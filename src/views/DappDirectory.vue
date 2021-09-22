<template>
  <div class="p-5">
    <div class="container">
      <div v-if="!$store.state.userDID" class="text-center">
        <NotAuthorized />
      </div>
      <div v-else>
        <div id="defList" class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <router-link to="/dapps/create" class="btn btn-primary float-end">+ Add dApp</router-link>
                <h1>DApp Directory Listings</h1>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotAuthorized from '@/components/NotAuthorized'

export default {
  name: 'DappDirectory',
  components: {
    NotAuthorized
  }
}
</script>
