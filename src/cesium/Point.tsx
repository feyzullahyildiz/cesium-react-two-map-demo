import { Cartesian3 } from "cesium";
import React, { FC, useEffect } from "react";
import { useViewer } from "./hooks";

interface Props {
  coordinate: Cartesian3;
  pixelSize?: number;
}
export const Point: FC<Props> = ({ coordinate, pixelSize = 10 }) => {
  const viewer = useViewer();
  useEffect(() => {
    const entity = viewer.entities.add({
      position: coordinate,
      point: {
        pixelSize: pixelSize,
      },
    });

    return () => {
      viewer.entities.remove(entity);
    };
  }, [coordinate, pixelSize]);
  return null;
};
