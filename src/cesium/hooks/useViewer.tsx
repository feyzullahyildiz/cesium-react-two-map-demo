import React, { useContext } from "react";
import { ViewerContext } from "../context/ViewerContext";

export const useViewer = () => useContext(ViewerContext);
