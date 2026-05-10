import { TZ } from '@buildwithdarsh/sdk';

TZ.init({
  orgSlug: 'sidekaam',
  orgKey: process.env['NEXT_PUBLIC_TZ_ORG_KEY'] || '',
  baseUrl: process.env['NEXT_PUBLIC_TZ_API_URL'] || 'https://api.work.withdarsh.com',
  env: process.env['NEXT_PUBLIC_TZ_ENV'] === 'production' ? 'production' : 'dev',
  keyPrefix: 'sk',
});

// ─── App config (fetched once, cached) ──────────────────────────────────────

let _config: any = null;
let _configPromise: Promise<any> | null = null;

export async function getAppConfig() {
  if (_config) return _config;
  if (!_configPromise) {
    _configPromise = TZ.storefront.config.get().then((c: any) => {
      _config = c;
      return c;
    }).catch(() => null);
  }
  return _configPromise;
}

export function getCachedConfig() {
  return _config;
}

// Pre-fetch config on client side
if (typeof window !== 'undefined') {
  getAppConfig();
}

export { TZ };
