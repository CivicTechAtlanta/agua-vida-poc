import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

self.addEventListener("install", serwist.handleInstall);
self.addEventListener("activate", serwist.handleActivate);
self.addEventListener("message", serwist.handleCache);
self.addEventListener("fetch", (ev) => {
  try {
    console.log('handling fetch in service worker', ev.request)
    const responsePromise = serwist.handleRequest({ event: ev, request: ev.request })
    if (responsePromise) {
      ev.respondWith(responsePromise)
    } else {
      throw new Error('serwist failed to handle request' + ev.request)
    }
  } catch (err) {
    console.log('request failed. trying precache for' + ev.request + " " + (err as Error)?.message)
    const cachedResponse = (serwist.matchPrecache(ev.request) ?? Response.error()) as Promise<Response>
    ev.respondWith(cachedResponse)
  }
});

