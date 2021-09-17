import WalletConnectProvider from '@walletconnect/web3-provider'
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import Authereum from 'authereum'
import Fortmatic from 'fortmatic'
import Web3Modal from 'web3modal'

// @ts-ignore
export const threeID = new ThreeIdConnect()

export const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'c78fc9a543e044c5a1ed49291486b5e4',
      },
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: 'pk_live_9A76AE31F63FD118',
      },
    },
    authereum: {
      package: Authereum,
      options: {},
    },
  },
})

export async function getProvider() {
  const ethProvider = await web3Modal.connect()
  const addresses = await ethProvider.enable()
  await threeID.connect(new EthereumAuthProvider(ethProvider, addresses[0]))
  return threeID.getDidProvider()
}
