import { IDX } from '@ceramicstudio/idx';
import store from '@/store';

// const aliases = {
//   SBDappDirectory:
//     'kjzl6cwe1jw14adkbcsc7y67tta1tpfpjvtlst7dfxw1jo84tna62puv8i88exg',
// };

export function createIDX(ceramic) {
  // add, aliases after creating
  const idx = new IDX({ ceramic });
  window.idx = idx;
  store.commit('setIDX', idx);
  return idx;
}
