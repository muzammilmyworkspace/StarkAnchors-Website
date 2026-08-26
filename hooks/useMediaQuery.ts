"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * Implemented with `useSyncExternalStore` rather than
 * `useState` + `useEffect`: matchMedia is exactly the external mutable
 * source that API exists for. It also removes the usual hydration
 * dance — the server snapshot is `false`, React hydrates against it and
 * then resubscribes to the real value in one pass, with no flash and no
 * setState inside an effect.
 *
 * Consumers must therefore treat `false` as "not yet known" and render
 * the conservative branch (fewer nodes, less motion) by default.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  // Server and first hydration pass: assume the conservative branch.
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
