import React, { FC, useEffect } from "react";
import { useViewer } from "./hooks";
import { Cartesian3, ScreenSpaceEventType } from "cesium";
import { Viewer as CesiumViewer } from "cesium";

interface Props {
  onClick: (params: Cartesian3) => void;
}
export const CoordinatePicker: FC<Props> = ({ onClick }) => {
  const viewer = useViewer();
  useEffect(() => {
    viewer.screenSpaceEventHandler.setInputAction((e) => {
      onClick(viewer.scene.pickPosition(e.position));
    }, ScreenSpaceEventType.LEFT_CLICK);

    return () => {
      viewer.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.LEFT_CLICK
      );
    };
  }, [viewer, onClick]);
  return null;
};
