/// <reference types="vite/client" />

declare module "virtual:pwa-register" {
  export type RegisterSWOptions = {
    immediate?: boolean;
    onNeedRefresh?: () => void;
    onOfflineReady?: () => void;
    onRegistered?: (
      registration: ServiceWorkerRegistration | undefined,
    ) => void;
    onRegisterError?: (error: any) => void;
  };

  declare module "react-icons/*" {
    import { SVGProps } from "react";
    const content: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    export default content;
  }

  export function registerSW(options?: RegisterSWOptions): {
    update: () => void;
  };
}
