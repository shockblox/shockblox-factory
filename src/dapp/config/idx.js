import { IDX } from '@ceramicstudio/idx'

const aliases = {
  SBDappDirectory: 'kjzl6cwe1jw14adkbcsc7y67tta1tpfpjvtlst7dfxw1jo84tna62puv8i88exg'
}

export function createIDX(ceramic) {
  const idx = new IDX({ ceramic, aliases })
  window.idx = idx
  return idx
}