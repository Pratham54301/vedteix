"use client";

import { useEffect } from "react";

const TIDIO_SELECTORS = [
  'script[src*="code.tidio.co"]',
  'iframe[src*="tidio"]',
  'iframe[id*="tidio"]',
  'div[id^="tidio"]',
  '#tidio-chat',
];

function removeTidioArtifacts() {
  document.querySelectorAll(TIDIO_SELECTORS.join(",")).forEach((node) => {
    node.remove();
  });

  if ("tidioChatApi" in window) {
    delete (window as Window & { tidioChatApi?: unknown }).tidioChatApi;
  }
}

export function TidioCleanup() {
  useEffect(() => {
    removeTidioArtifacts();
    const interval = window.setInterval(removeTidioArtifacts, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
