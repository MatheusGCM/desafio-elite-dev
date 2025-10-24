interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: "development" | "production";
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
