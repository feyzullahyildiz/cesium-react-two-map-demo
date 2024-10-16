import { Cartesian3 } from "cesium";
import React, { FC, useEffect } from "react";
import { usePointApi, useViewer } from "./hooks";

interface Props {
  coordinate: Cartesian3;
  pixelSize?: number;
  id?: any;
}
export const Point: FC<Props> = ({ coordinate, pixelSize = 10, id }) => {
  const viewer = useViewer();
  const pointApi = usePointApi(id);
  useEffect(() => {
    const entity = viewer.entities.add({
      position: coordinate,
      point: {
        pixelSize: pixelSize,
      },
    });
    const zoomTo = () => viewer.flyTo(entity);
    pointApi.subscribe({
      zoomTo,
      // selam: "SELAM HAYDAR"
    });

    return () => {
      viewer.entities.remove(entity);
      pointApi.destroy();
    };
  }, [coordinate, pixelSize]);
  return null;
};
