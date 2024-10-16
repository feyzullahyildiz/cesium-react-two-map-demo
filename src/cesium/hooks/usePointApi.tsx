import React, { useCallback, useContext, useState } from "react";
import { SubscriptionContext } from "../context/SubscriptionContext";

export const usePointApi = (id) => {
  const provider = useContext(SubscriptionContext);
  const [_, reRenderValue] = useState(0);
  const next = useCallback(() => reRenderValue((p) => p + 1), []);
  return {
    subscribe: (a: any) => {
      provider.subscribe(id, a);
      next();
    },
    destroy: () => {
      provider.destroy(id);
      next();
    },
    getApi: () => {
      // next();
      return provider.getApi(id);
    },
  };
};
