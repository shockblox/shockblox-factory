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
import { DID } from 'dids'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import KeyDidResolver from 'key-did-resolver'
import { createCeramic } from '@/dapp/config/ceramic'
import { getProvider } from '@/dapp/config/wallet'
import { createIDX } from '@/dapp/config/idx'

const ceramicPromise = createCeramic()

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
    userDID() {
      return this.$store.state.userDID
    },
    userProfile() {
      return this.$store.state.userProfile
    },
    idx() {
      return this.$store.state.idx
    }
  },
  mounted() {
    this.getBasicProfile()
  },
  methods: {
    async setBasicProfile() {
      // Check if name and description are set, switch for real validation later
      if(!this.basicProfile.name || !this.basicProfile.description) {
        return
      }
      // Set up IDX
      const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
      const did = new DID({
        provider,
        resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
      })
      // Connecting wallet...
      this.connecting = true
      await did.authenticate()
      ceramic.did = did
      this.$store.commit('setUserDID', did)
      const idx = await createIDX(ceramic)

      try {
        // Set the profile
        await idx.set('basicProfile', this.basicProfile)
        this.getBasicProfile()
      }catch(e) {
        console.log(e)
      }
    },
    async getBasicProfile() {
      const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
      const did = new DID({
        provider,
        resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
      })
      // Connecting wallet...
      this.connecting = true
      await did.authenticate()
      ceramic.did = did
      this.$store.commit('setUserDID', did)
      const idx = await createIDX(ceramic)
      const profile = await idx.get('basicProfile')
      this.$store.commit('setUserProfile', profile)

      // IS THERE NO WAY TO REINSTANTIATE IDX FROM AN ALREADY AUTHORIZED 3ID DID?
    }
  }
}
</script>
