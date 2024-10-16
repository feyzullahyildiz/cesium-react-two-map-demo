import React, { useState } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./App.css";
import {
  CoordinatePicker,
  Measure,
  Point,
  RightClick,
  SubscriptionProvider,
  Viewer,
} from "./cesium";
import { Cartesian3 } from "cesium";
import { CoordinatesUI } from "./ui";

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
      <SubscriptionProvider>

        <Viewer>
          <RightClick onRightClick={onRightClick} />
          <CoordinatePicker onClick={onAddPoint}></CoordinatePicker>
          {points.map((p, i) => (
            <Point key={i} id={`point-${i}`} coordinate={p} />
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
          <hr />

          <CoordinatesUI points={points} />
        </div>
      </SubscriptionProvider>
    </div>
  );
}

export default App;
