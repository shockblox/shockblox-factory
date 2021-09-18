<template>
  <div id="idxCheckDID" class="row">
    <div class="col-12 col-lg-6 offset-lg-3">
      <div class="card">
        <div class="card-body">
          <h1>Set Your Profile Info</h1>
          <div class="form-group mb-4">
            <label class="mb-3">Your Name</label>
            <input type="text" v-model="basicProfile.name" class="form-control" placeholder="Elon Musk...">
          </div>
          <div class="form-group mb-4">
            <label class="mb-3">Short Bio</label>
            <input type="text" v-model="basicProfile.description" class="form-control" placeholder="I own Tesla Motors, SpaceX and a whole bunch of other things...">
          </div>
          <div class="form-group mb-4">
            <button
              class="btn btn-primary btn-lg"
              @click="setBasicProfile()"
              v-bind:class="{disabled: loading}"
              :disabled="loading"
            >
                <span v-if="loading">Communicating with IDX...</span>
                <span v-else>Save Profile</span>
            </button>
          </div>
          <div v-if="basicProfile" class="alert alert-info">
            <h6>Profile</h6>
            {{userProfile}}
          </div>
          <div v-if="error" class="alert alert-info">{{error}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createIDX } from '@/dapp/config/idx'
export default {
  data() {
    return {
      basicProfile: {
        name: '',
        description: ''
      },
      loading: false,
      error: null
    }
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile
    }
  },
  methods: {
    async setBasicProfile() {
      let ceramic = window.ceramic
      ceramic.did = window.did
      const idx = await createIDX(ceramic)
      // Check if name and description are set, switch for real validation later
      if(!this.basicProfile.name || !this.basicProfile.description) {
        return
      }
      try {
        // Set the profile
        await idx.set('basicProfile', this.basicProfile)
        // Get the profile
        const profile = await idx.get('basicProfile')
        // Commit the profile to the store
        this.$store.commit('setUserProfile', profile)
      }catch(e) {
        console.log(e)
      }
    }
  }
}
</script>
