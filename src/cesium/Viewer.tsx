import React, { useLayoutEffect, useRef, useState } from "react";

import {
  Cartesian3,
  Math as CesiumMath,
  Terrain,
  Viewer as CesiumViewer,
  createOsmBuildingsAsync,
} from "cesium";
import { ViewerContext } from "./context/ViewerContext";

interface Props {
  children?: React.ReactNode;
}
export const Viewer: React.FC<Props> = ({ children }) => {
  const divRef = useRef<HTMLDivElement>(null!);
  const [viewer, setViewer] = useState<CesiumViewer | null>();
  useLayoutEffect(() => {
    const v = new CesiumViewer(divRef.current);
    setViewer(v);
    return () => {
      setViewer(null);
      v.destroy();
    };
  }, []);
  return (
    <>
      <div ref={divRef} className="bg-red-400 h-full"></div>
      {viewer && (
        <ViewerContext.Provider value={viewer}>
          {children}
        </ViewerContext.Provider>
      )}
    </>
  );
};
