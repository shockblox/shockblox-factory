<template>
  <button
    v-if="!$store.state.userDID"
    class="btn btn-lg btn-secondary
    me-3"
    @click="connectWallet"
    v-bind:class="{disabled: connecting}"
    :disabled="connecting">
      <span v-if="connecting">Connecting Wallet...</span>
      <span v-else>Connect Wallet</span>
    </button>
  <button
    v-else class="btn btn-lg btn-secondary me-3"
    @click="disconnect">
      disconnect
  </button>
</template>

<script>
import { DID } from 'dids'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import KeyDidResolver from 'key-did-resolver'

import { createCeramic } from '@/dapp/config/ceramic'
import { createIDX } from '@/dapp/config/idx'
import { getProvider } from '@/dapp/config/wallet'

const ceramicPromise = createCeramic()

export default {
  name: 'Home',
  data() {
    return {
      connecting: false,
      profile: null
    }
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile
    }
  },
  methods: {
    async authenticate() {
      const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
      const did = new DID({
        provider,
        resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
      })
      // Connecting wallet...
      this.connecting = true
      await did.authenticate()
      window.did = did
      ceramic.did = did
      this.$store.commit('setUserDID', did)
      const idx = await createIDX(ceramic)
      return idx.id
    },
    async ethAddressToDID(address) {
      const caip10Doc = await window.ceramic?.createDocument('caip10-link', {
        metadata: {
          family: 'caip10-link',
          controllers: [address.toLowerCase() + '@eip155:1'],
        },
      })
      return caip10Doc?.content
    },
    async connectWallet() {
      // Authenticate
      try {
        const id = await this.authenticate()
        // Commit the id to the store
        this.$store.commit('setUserDID', id)
        // No longer connecting
        this.connecting = false
      }catch(e) {
        this.$store.commit('setUserDID', null)
        // No longer connecting
        this.connecting = false
      }
    },
    disconnect() {
      this.$store.commit('setUserDID', null)
    }
  }
}
</script>