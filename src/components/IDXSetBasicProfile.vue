<template>
  <div id="idxCheckDID" class="row">
    <div class="col-12 col-lg-6 offset-lg-3">
      <div class="card">
        <div class="card-body">
          <h1>Set Your Profile Info</h1>
          <div class="form-group mb-4">
            <label class="mb-3">Your Name</label>
            <input type="text" v-model="basicProfileName" class="form-control" placeholder="Elon Musk...">
          </div>
          <div class="form-group mb-4">
            <button
              class="btn btn-primary btn-lg"
              @click="setIDXBasicProfile()"
              v-bind:class="{disabled: loading}"
              :disabled="loading"
            >
                <span v-if="loading">Communicating with IDX...</span>
                <span v-else>Save Profile</span>
            </button>
          </div>
          <div v-if="basicProfile" class="alert alert-info">
            <h6>Profile</h6>
            {{basicProfile}}
          </div>
          <div v-if="error" class="alert alert-info">{{error}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicProfileName: '',
      basicProfile: null,
      loading: false,
      error: null
    }
  },
  methods: {
    async setIDXBasicProfile() {
      if(!this.basicProfileName) {
        return
      }
      // Grab the record...
      this.loading = true

      try {
        // Get the alias... 

        // Set the result and disable loading indicators
        this.loading = false
      }catch(e) {
        this.aliasError = e
        this.loading = false
      }
    }
  }
}
</script>
