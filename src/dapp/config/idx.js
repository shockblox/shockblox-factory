import { IDX } from '@ceramicstudio/idx';

const aliases = {
  SBDappDirectory:
    'k3y52l7qbv1fry9xv24yst9c3w8t8bmjpfguiipc8u1ltmzn7ziof0lc4iysohclc',
};

export function createIDX(ceramic) {
  // add, aliases after creating
  const idx = new IDX({ ceramic, aliases });
  window.idx = idx;
  return idx;
}
