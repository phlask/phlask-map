import { createContext, type Dispatch, type SetStateAction } from 'react';

export type OverlaySection = 'toolbar' | 'head-menu-page' | 'selected-tap';

export const ActiveOverlaySectionContext = createContext<
  [OverlaySection | null, Dispatch<SetStateAction<OverlaySection | null>>]
>([null, () => null]);
