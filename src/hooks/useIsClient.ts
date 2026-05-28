"use client";

import { useState, useEffect } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Used to guard recharts (and any DOM-measurement-dependent) renders
 * from SSR — prevents the "width(-1) height(-1)" error.
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}
