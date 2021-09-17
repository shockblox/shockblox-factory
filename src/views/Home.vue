<template>
  <div class="p-5">
    <div class="container">
      <div class="text-center">
        <h1>Shockblox Factory</h1>
        <button v-if="!$store.state.userDID" class="btn btn-lg btn-primary me-3" @click="connectWallet">Connect Wallet</button>
        <button v-else class="btn btn-lg btn-secondary me-3" @click="disconnect">Disconnect</button>
        <button class="btn btn-lg btn-primary" @click="ceramic">Start Ceramic</button>
      </div>
    </div>
  </div>
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
  methods: {
    async authenticate() {
      const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
      const did = new DID({
        provider,
        resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
      })
      await did.authenticate()
      window.did = did
      ceramic.did = did
      const idx = createIDX(ceramic)
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
        console.log(id)
        this.$store.commit('setUserDID', id)
      }catch(e) {
        this.$store.commit('setUserDID', null)
      }
    },
    disconnect() {
      this.$store.commit('setUserDID', null)
    }
  }
}
</script>
