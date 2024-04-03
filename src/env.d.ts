/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly XATA_API_KEY: string;
    readonly XATA_BRANCH: string;
    readonly MY_PASSWORD: string;
    readonly F_PRIVATE_KEY_ID: string;
    readonly F_PRIVATE_KEY: string;
    readonly F_PROJECT_ID: string;
    readonly F_CLIENT_EMAIL: string;
    readonly F_CLIENT_ID: string;
    readonly F_AUTH_URI: string;
    readonly F_TOKEN_URI: string;
    readonly F_AUTH_CERT_URL: string
    readonly F_CLIENT_CERT_URL: string;
    readonly APIKEY: string;
    readonly AUTHDOMAIN: string;
    readonly PROJECTID: string;
    readonly STORAGEBUCKET: string;
    readonly MESSAGINGSENDERID: string;
    readonly APPID: string;
    readonly MEASUREMENTID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }