import Ceramic from '@ceramicnetwork/http-client'

export async function createCeramic() {
  let ceramicNode = process.env.VUE_APP_CERAMIC_DEV_URL
  const ceramic = new Ceramic(ceramicNode)
  window.ceramic = ceramic
  return Promise.resolve(ceramic)
}
