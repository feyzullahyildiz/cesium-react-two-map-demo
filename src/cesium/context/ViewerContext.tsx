import { createContext } from "react";
import { Viewer as CesiumViewer } from "cesium";

export const ViewerContext = createContext<CesiumViewer>(null!);
