import { Cartesian3 } from "cesium";
import React from "react";
import { usePointApi } from "../cesium";

interface Props {
  points: Cartesian3[];
}
export const CoordinatesUI = ({ points }: Props) => {
  return (
    <div>
      KOORDİNATLAR
      {points.map((point, index) => (
        <Coordinate key={index} id={`point-${index}`} />
      ))}
    </div>
  );
};

const Coordinate = ({ id }) => {
  const { getApi } = usePointApi(id);
  console.log("id", id, getApi())
  if (!getApi()) {
    return <>YOOO</>;
  }
  return (
    <div key={id} className="flex gap-4 items-center my-1">
      Coord ({id})
      <button
        onClick={() => console.log(getApi())}
        className="bg-white text-yellow-900 px-1 py-1"
      >
        {/* GİT {getApi().selam} */}
        GİT
      </button>
    </div>
  );
};
