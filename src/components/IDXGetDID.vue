<template>
  <div id="idxCheckDID" class="row">
    <div class="col-12 col-lg-6 offset-lg-3">
      <div class="card">
        <div class="card-body">
          <h1>Retrieve an Alias From IDX</h1>
          <div class="form-group mb-4">
            <label class="mb-3">Enter an alias</label>
            <input type="text" v-model="idxAlias" class="form-control" placeholder="SBDAppDirectory...">
          </div>
          <div class="form-group mb-4">
            <button
              class="btn btn-primary btn-lg"
              @click="getIdxAlias()"
              v-bind:class="{disabled: gettingAlias}"
              :disabled="gettingAlias"
            >
                <span v-if="gettingAlias">Getting Alias...</span>
                <span v-else>Fetch Alias</span>
            </button>
          </div>
          <div v-if="idxAliasResult" class="alert alert-info">
            <h6>Last Alias Retrieved</h6>
            {{idxAliasResult}}
          </div>
          <div v-if="aliasError" class="alert alert-info">{{aliasError}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idxAlias: null,
      idxAliasResult: null,
      gettingAlias: false,
      aliasError: null
    }
  },
  methods: {
    async getIdxAlias() {
      if(!this.idxAlias) {
        return
      }
      // Grab the record...
      this.gettingAlias = true

      try {
        // Get the alias... 

        // Set the result and disable loading indicators
        this.idxAliasResult = result
        this.gettingAlias = false
      }catch(e) {
        this.aliasError = e
        this.gettingAlias = false
      }
    }
  }
}
</script>
