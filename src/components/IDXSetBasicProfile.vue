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
      const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
      let did = new DID({
        provider,
        resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
      })
      did = await did.resolve(this.userDID)
      console.log(did)
      ceramic.did = did
      const idx = await createIDX(ceramic)
      console.log(idx)

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
    },
    async getBasicProfile() {
      // Failing implementation #1
      // const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
      // let did = new DID({
      //   provider,
      //   resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
      // })
      // did = await did.resolve(this.userDID)
      // console.log(did)
      // ceramic.did = did
      // const idx = await createIDX(ceramic)
      // const profile = await idx.get('basicProfile')
      // console.log('profile', profile)
      // this.$store.commit('setUserProfile', profile)

      // Failing implementation #2
      const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
      const did = new DID({
        provider,
        resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
      })
      const didDoc = await did.resolve('did:3:kjzl6cwe1jw146q0kev6tjjbhwb7mqxnwxepua0gelvxcqkzwgrd26wh37ag9gb')
      ceramic.did = didDoc.didDocument
      const idx = await createIDX(ceramic)
      const profile = await idx.set('basicProfile', {name: 'fromjs', description: 'tojs'})
      console.log(profile)

      // IS THERE NO WAY TO REINSTANTIATE IDX FROM AN ALREADY AUTHORIZED 3ID DID?
    }
  }
}
</script>
