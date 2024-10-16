import { Cartesian2, Cartesian3, Color, EllipsoidGeodesic } from "cesium";
import React, { FC, useEffect } from "react";
import { useViewer } from "./hooks";

interface Props {
  coordinates: Array<Cartesian3>;
  pixelSize?: number;
  onChange?: (e: number) => void;
}
export const Measure: FC<Props> = ({
  coordinates,
  pixelSize = 10,
  onChange,
}) => {
  const viewer = useViewer();

  useEffect(() => {
    // console.log("EKLE");
    const entities = coordinates.map((coord) => {
      const entity = viewer.entities.add({
        position: coord,
        point: {
          pixelSize: pixelSize,
        },
      });
      return entity;
    });
    const polyline = viewer.entities.add({
      polyline: {
        positions: coordinates,
        width: 5,
        material: Color.RED,
        // clampToGround: true,
      },
    });
    let total = 0;
    if (coordinates.length > 1) {
      for (let i = 0; i < coordinates.length - 1; i++) {
        const a = coordinates[i];
        const b = coordinates[i + 1];
        const len = calculateDistance(a, b);
        total += len;
      }
    }
    if (onChange) {
      onChange(total);
    }
    const textLabel = viewer.entities.add({
      position: coordinates[0],
      label: {
        text: `${total.toFixed(2)} meter`,
        font: "20px sans-serif",
        pixelOffset: new Cartesian2(0.0, 20),
      },
    });
    // console.log("SIZE", viewer.entities.values);

    return () => {
      //   console.log("ÇIKAR");
      viewer.entities.remove(polyline);
      viewer.entities.remove(textLabel);
      for (const entity of entities) {
        viewer.entities.remove(entity);
      }
    };
  }, [coordinates, viewer, pixelSize, onChange]);
  return null;
};

function calculateDistance(point1: Cartesian3, point2: Cartesian3) {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const dz = point2.z - point1.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
