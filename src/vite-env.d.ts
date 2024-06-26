/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORAGE_KEY: string;
  readonly VITE_APP_PASSWORD_FLOW_SECRET: string;
  readonly VITE_APP_PASSWORD_FLOW_ID: string;
  readonly VITE_APP_AUTH_URL: string;
  readonly VITE_APP_PROJECT_KEY: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_CATEGORIES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
