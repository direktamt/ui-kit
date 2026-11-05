import { createContext, useContext } from 'react';

export interface AppShellContextValue {
  /** Closes the mobile navigation drawer; no-op on wide screens. */
  closeNavigation: () => void;
}

export const AppShellContext = createContext<AppShellContextValue | null>(null);

/**
 * Access to the surrounding `AppShell`, or `null` outside of one.
 */
export function useAppShell(): AppShellContextValue | null {
  return useContext(AppShellContext);
}
