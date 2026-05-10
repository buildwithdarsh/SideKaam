"use client";

/**
 * App init — fetches config + user in one parallel call.
 * Shared by AppLoader and AuthProvider.
 */

import { TZ, getAppConfig } from "./tz";

interface InitResult {
  config: any;
  user: any | null;
}

let _initPromise: Promise<InitResult> | null = null;
let _initResult: InitResult | null = null;

export function getInitResult() {
  return _initResult;
}

export function initApp(): Promise<InitResult> {
  if (_initResult) return Promise.resolve(_initResult);
  if (_initPromise) return _initPromise;

  _initPromise = Promise.all([
    getAppConfig(),
    TZ.storefront.auth.me().catch(() => null),
  ]).then(([config, user]) => {
    _initResult = { config, user };
    return _initResult;
  }).catch(() => {
    _initResult = { config: null, user: null };
    return _initResult;
  });

  return _initPromise;
}

// Pre-kick on client
if (typeof window !== "undefined") {
  initApp();
}
