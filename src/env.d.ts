/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly F_PRIVATE_KEY_ID: string;
    readonly F_PRIVATE_KEY: string;
    readonly F_PROJECT_ID: string;
    readonly F_CLIENT_EMAIL: string;
    readonly F_CLIENT_ID: string;
    readonly F_AUTH_URI: string;
    readonly F_TOKEN_URI: string;
    readonly F_AUTH_CERT_URL: string
    readonly F_CLIENT_CERT_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }