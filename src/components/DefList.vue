<template>
  <div id="defList" class="row">
    <div class="col-12 col-lg-6 offset-lg-3">
      <div class="card">
        <div class="card-body">
          <h1>My Definitions</h1>
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
