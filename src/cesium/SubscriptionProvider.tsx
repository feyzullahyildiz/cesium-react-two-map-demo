import React, { useMemo } from "react";
import { SubscriptionContext } from "./context/SubscriptionContext";

interface Props {
  children?: React.ReactNode;
}
export const SubscriptionProvider = ({ children }: Props) => {
  const map = useMemo(() => new Map(), []);

  (window as any).feyz_MAP = map;
  const value = {
    subscribe: (key, obj) => map.set(key, obj),
    destroy: (key) => map.delete(key),
    getApi: (key) => map.get(key),
  };
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
