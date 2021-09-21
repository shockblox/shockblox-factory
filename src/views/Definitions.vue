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
                <router-link to="/definitions/create" class="btn btn-primary float-end">+ Add Custom Definition</router-link>
                <h1>My Definitions</h1>
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
  name: 'Definitions',
  components: {
    NotAuthorized
  }
}
</script>
