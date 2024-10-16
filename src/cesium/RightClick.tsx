import React, { FC, useEffect } from "react";
import { useViewer } from "./hooks";
import { ScreenSpaceEventType } from "cesium";

interface Props {
  onRightClick: VoidFunction;
}
export const RightClick: FC<Props> = ({ onRightClick }) => {
  const viewer = useViewer();
  useEffect(() => {
    viewer.screenSpaceEventHandler.setInputAction(
      onRightClick,
      ScreenSpaceEventType.RIGHT_CLICK
    );
    return () => {
      viewer.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.RIGHT_CLICK
      );
    };
  }, [viewer, onRightClick]);
  return null;
};
