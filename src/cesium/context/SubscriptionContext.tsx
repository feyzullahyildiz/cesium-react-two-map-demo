import { createContext } from "react";

export const SubscriptionContext = createContext<{
  subscribe: (key: any, value: any) => void;
  destroy: (key: any) => void;
  getApi: (key: any) => any;
}>(null!);
