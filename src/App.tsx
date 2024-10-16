import React, { useState } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./App.css";
import { CoordinatePicker, Measure, Point, RightClick, Viewer } from "./cesium";
import { Cartesian3 } from "cesium";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [measureDistance, setMeasureDistance] = useState(0);
  const [points, setPoints] = useState<Cartesian3[]>([]);
  const onAddPoint = (cart3: Cartesian3) => {
    setPoints((p) => [...p, cart3]);
  };
  const onRightClick = () => {
    console.log("ON RIGHT CLICK");
    setPoints((prev) => {
      const clone = [...prev];
      clone.pop();
      return clone;
    });
  };

  return (
    <div className="relative flex flex-col bg-gray-800 h-full">
      <div className="absolute z-10 p-8 bg-red-400 flex flex-col items-start">
        <label className="flex gap-4">
          AÇ KAPA
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>
        <div>METRE: {measureDistance.toFixed(2)}</div>
        {/* <hr />
        KOORDİNATLAR
        {points.map((point, index) => (
          <div className="flex gap-4 items-center my-1">
            Coord ({index + 1})
            <button className="bg-white text-yellow-900 px-1 py-1">GİT</button>
          </div>
        ))} */}
      </div>
      <Viewer>
        <RightClick onRightClick={onRightClick} />
        <CoordinatePicker onClick={onAddPoint}></CoordinatePicker>
        {points.map((p, i) => (
          <Point key={i} coordinate={p} />
        ))}
        {/* <Point
          pixelSize={50}
          coordinate={
            {
              x: -406690.6175704841,
              y: -5163966.105705455,
              z: 3702119.098467817,
            } as any
          }
        /> */}
      </Viewer>
      <Viewer>
        {/* {points.map((p, i) => (
          <Point key={i} coordinate={p} pixelSize={24} />
        ))} */}
        {isActive && (
          <Measure coordinates={points} onChange={setMeasureDistance} />
        )}
      </Viewer>
    </div>
  );
}

export default App;
